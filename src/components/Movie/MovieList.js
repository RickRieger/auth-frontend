import React from 'react';
import { Link } from 'react-router-dom';
function MovieList(props) {
  return props.movieArray.map((item) => {
    return (
      <div className="img-container-outer " key={item.imdbID}>
      <Link
        style={{
          textDecoration: 'none',
          color: 'crimson',
        }}
        to={{
          pathname: `/movie-detail/${item.Title}`,
          search: `?t=${item.Title}`,
        }}
      >
        
          <div className="img-container-inner effect">
            <div className="year"style={{ textAlign: 'center' }}>{item.Year}</div>
            <img className="poster"src={item.Poster} alt={item.Title} />
            <div className="title"style={{ textAlign: 'center' }}>{item.Title}</div>
          </div>
        
      </Link>
      </div>
    );
  });
}

export default MovieList;
