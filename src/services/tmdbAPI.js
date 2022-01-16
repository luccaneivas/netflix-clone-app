const API_KEY = 'c864876721a4c963f683bc07ec1bb79c';
const API_BASE = 'https://api.themoviedb.org/3';

// URLs
const ORIGINALS = `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`;
const TRENDING = `/trending/all/week?language=pt-BR&api_key=${API_KEY}`;
const TOP_RATED = `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`;
const ACTION = `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`;
const COMEDY = `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`;
const HORROR = `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`;
const ROMANCE = `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`;
const DOCUMENTARY = `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`;

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => (
    [
      {
        slug: 'originals',
        title: 'Originais Netflix',
        items: await basicFetch(ORIGINALS),
      },
      {
        slug: 'trending',
        title: 'Recomendados para você',
        items: await basicFetch(TRENDING),
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(TOP_RATED),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(ACTION),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(COMEDY),
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(HORROR),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(ROMANCE),
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(DOCUMENTARY),
      },
    ]
  ),
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
      case 'movie':
        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      case 'tv':
        info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      default:
        info = null;
        break;
      }
    }

    return info;
  },
};
