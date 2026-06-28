const API_KEY = "d8f5bbc6e67e404fa21737980e26a4c7";
const BASE_URL = "https://api.rawg.io/api";

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; //5 minutos en mili segundos

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  // Si pasaron más de 5 minutos, el cache expiró
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

export const gameService = {
  // Traemos los videojuegos más populares
  async getPopularGames(page = 1, ordering = "-rating") {
    const KEY = `popular_games_page_${page}_${ordering}`;
    const cached = getCached(KEY);
    if (cached) return cached;

    try {
      const respuesta = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&ordering=${ordering}&page_size=20&page=${page}`,
      );
      if (!respuesta.ok) throw new Error("Error al traer juegos");
      const data = await respuesta.json();

      // Mapeamos los datos para quedarnos solo con lo que necesitamos (Los populares en este caso)
      // RAWG los devuelve como un array de objetos {id, name, etc...}
      const resultado = {
        juegos: data.results.map((game) => ({
          id: game.id,
          name: game.name,
          rating: game.rating,
          released: game.released,
          background_image: game.background_image,
          genres: game.genres,
        })),
        hayMas: data.next !== null, //nos da true solo si hay mas paginas
        total: data.count,
      };

      setCache(KEY, resultado); // ← guarda en cache antes de devolver
      return resultado;
    } catch (error) {
      console.error(error);
      return { juegos: [], hayMas: false, total: 0 };
    }
  },

  async getGameDetails(id) {
    try {
      const respuesta = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
      if (!respuesta.ok) throw new Error("Error al traer los datos");
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error("error al obtener detalles del juego", error);
      return null;
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
      return [];
    }
  },
  async buscarJuegos(termino, page = 1) {
    const KEY = `busqueda_${termino}_page_${page}`;
    const cached = getCached(KEY);
    if (cached) return cached;

    try {
      const respuesta = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(termino)}&page_size=20&page=${page}`,
      );
      if (!respuesta.ok) throw new Error("Error al buscar");
      const data = await respuesta.json();
      const resultado = {
        juegos: data.results.map((game) => ({
          id: game.id,
          name: game.name,
          rating: game.rating,
          released: game.released,
          background_image: game.background_image,
          genres: game.genres,
        })),
        hayMas: data.next !== null,
        total: data.count,
      };
      setCache(KEY, resultado);
      return resultado;
    } catch (error) {
      console.error(error);
      return { juegos: [], hayMas: false, total: 0 };
    }
  },
};
