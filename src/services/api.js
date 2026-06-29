const API_KEY = "d8f5bbc6e67e404fa21737980e26a4c7";
const BASE_URL = "https://api.rawg.io/api";

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en milisegundos

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

function mapearJuego(game) {
  return {
    id: game.id,
    name: game.name,
    rating: game.rating,
    released: game.released,
    background_image: game.background_image,
    genres: game.genres,
  };
}

export const gameService = {
  /**
   * Función principal de búsqueda: combina texto, género y ordenamiento.
   * Todos los parámetros son opcionales y se pueden combinar libremente.
   *
   * @param {object} opciones
   * @param {string}  opciones.termino   - texto de búsqueda (vacío = sin búsqueda)
   * @param {string}  opciones.genero    - slug del género (vacío = todos)
   * @param {string}  opciones.ordering  - campo de orden de la API
   * @param {number}  opciones.page      - página a cargar
   */
  async buscarConFiltros({ termino = "", genero = "", ordering = "-rating", page = 1 } = {}) {
    const KEY = `juegos_${termino}_${genero}_${ordering}_${page}`;
    const cached = getCached(KEY);
    if (cached) return cached;

    try {
      // Construimos los parámetros de la URL dinámicamente
      const params = new URLSearchParams({
        key: API_KEY,
        page_size: 50,
        page,
      });

      const añoActual = new Date().getFullYear();

      params.set(
        "dates",
        `1950-01-01,${añoActual}-12-31`
      );

      // Solo agregamos los parámetros que tienen valor
      if (termino.trim()) params.set("search", termino.trim());
      if (genero) params.set("genres", genero);


      params.set("ordering", ordering);

      const respuesta = await fetch(`${BASE_URL}/games?${params}`);
      if (!respuesta.ok) throw new Error("Error al traer juegos");
      const data = await respuesta.json();

      let juegos = data.results.map(mapearJuego);

      const resultado = {
        juegos,
        hayMas: data.next !== null,
        total: data.count,
      };

      setCache(KEY, resultado);
      return resultado;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getGameDetails(id) {
    const KEY = `detalle_${id}`;
    const cached = getCached(KEY);
    if (cached) return cached;

    try {
      const respuesta = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!respuesta.ok) throw new Error("Error al traer los datos");
      const data = await respuesta.json();
      setCache(KEY, data);
      return data;
    } catch (error) {
      console.error("Error al obtener detalles del juego:", error);
      throw error;
    }
  },
  async getGenres() {
    const KEY = "genres";
    const cached = getCached(KEY);
    if (cached) return cached;

    try {
      const respuesta = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
      if (!respuesta.ok) throw new Error("Error al traer géneros");
      const data = await respuesta.json();
      const generos = data.results.map((g) => ({ id: g.id, name: g.name, slug: g.slug }));
      setCache(KEY, generos);
      return generos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
