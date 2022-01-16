import React, { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css';
import Tmdb from './services/tmdbAPI';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      const originals = list.filter((item) => item.slug === 'originals');
      const randomChosen = Math
        .floor(Math.random() * originals[0].items.results.length - 1);
      const chosen = originals[0].items.results[randomChosen];
      const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const MIN_SCROLL = 10;
    const scrollListener = () => {
      if (window.scrollY > MIN_SCROLL) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={ blackHeader } />

      {
        featuredData && <FeaturedMovie item={ featuredData } />
      }
      <section className="lists">
        {
          movieList.map((item, key) => (
            <MovieRow
              key={ key }
              title={ item.title }
              items={ item.items }
            />
          ))
        }
      </section>

      <footer>
        Feito com
        {' '}
        <span role="img" aria-label="coração">❤️</span>
        {' '}
        pelo Lucca
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados pegos do site themoviedb.org
      </footer>

      {
        movieList.length <= 0
        &&
        <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
        </div>
      }
    </div>
  );
};

export default App;
