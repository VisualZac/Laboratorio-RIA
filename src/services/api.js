const API_KEY = "d8f5bbc6e67e404fa21737980e26a4c7";
const BASE_URL = "https://api.rawg.io/api";

export const gameService = {
  // Traemos los videojuegos más populares
  async getPopularGames() {
    try {
      const respuesta = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=12`);
      if (!respuesta.ok) throw new Error("Error al traer los datos");
      const data = await respuesta.json();

      // Mapeamos los datos para quedarnos solo con lo que necesitamos (Los populares en este caso)
      return data.results.map((game) => ({
        id: game.id,
        name: game.name,
        rating: game.rating,
        released: game.released,
        background_image: game.background_image,
        genres: game.genres, // RAWG lo devuelve como un array de objetos {id, name, etc...}
      }));
    } catch (error) {
      console.error(error);
      return [];
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
    try {
      const respuesta = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
      if (!respuesta.ok) throw new Error("Error al traer géneros");
      const data = await respuesta.json();
      // Devolvemos solo id y name, no necesitamos más
      return data.results.map((g) => ({ id: g.id, name: g.name, slug: g.slug }));
    } catch (error) {
      console.error("Error al obtener géneros", error);
      return [];
    }
  },
};
