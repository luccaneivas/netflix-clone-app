import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const MovieRow = ({ title, items }) => {
  const ITEM_WIDTH = 150;
  const PADDINGS = 60;
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = items.results.length * ITEM_WIDTH;
    if (window.innerWidth - listW > x) {
      x = (window.innerWidth - listW) - PADDINGS;
    }

    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{ title }</h2>
      <div
        role="presentation"
        className="movieRow--left"
        onClick={ handleLeftArrow }
        onKeyDown={ handleLeftArrow }
      >
        <NavigateBeforeIcon style={ { fontSize: 50 } } />
      </div>
      <div
        role="presentation"
        className="movieRow--right"
        onClick={ handleRightArow }
        onKeyDown={ handleRightArow }
      >
        <NavigateNextIcon style={ { fontSize: 50 } } />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={
            { marginLeft: scrollX, width: items.results.length * ITEM_WIDTH }
          }
        >
          {
            items.results.length > 0 && items.results.map((item, key) => (
              <div className="movieRow--item" key={ key }>
                <img
                  src={ `https://image.tmdb.org/t/p/w300${item.poster_path}` }
                  alt={ item.original_title }
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

MovieRow.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
}.isRequired;

export default MovieRow;
