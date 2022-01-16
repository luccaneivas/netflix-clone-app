import React from 'react';
import './FeaturedMovie.css';
import PropTypes from 'prop-types';

const FeaturedMovie = ({ item }) => {
  const MAX_SIZE_DESCRIPTION = 200;
  const {
    backdrop_path: imageUrl,
    original_name: name,
    vote_average: rate,
    number_of_seasons: seasons,
    first_air_date: airDate,
  } = item;

  const firstDate = new Date(airDate);
  const genres = item.genres.reduce((prev, { name: genre }) => prev.concat(genre), []);

  let description = item.overview;
  if (description.length > MAX_SIZE_DESCRIPTION) {
    description = `${description.substring(0, MAX_SIZE_DESCRIPTION)}...`;
  }

  return (
    <section
      className="featured"
      style={ {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${imageUrl}`,
      } }
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{name}</div>
          <div className="featured--info">
            <div className="featured--points">{`${rate} pontos`}</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {
                `${seasons} temporada${seasons !== 1 ? 's' : ''}`
              }
            </div>
          </div>
          <div className="featured--description">
            {description}
          </div>
          <div className="featured--buttons">
            <a
              href={ `/watch/${item.id}` }
              className="featured--watchbutton"
            >
              ▶ Assistir
            </a>
            <a
              href={ `/list/add/${item.id}` }
              className="featured--mylistbutton"
            >
              + Minha Lista
            </a>
          </div>
          <div className="featured--genres">
            <strong>Gêneros:</strong>
            {' '}
            {genres.join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturedMovie.propTypes = {
  item: PropTypes.object,
}.isRequired;

export default FeaturedMovie;
