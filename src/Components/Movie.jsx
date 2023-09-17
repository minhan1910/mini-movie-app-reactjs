/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Movie({ imdbID, Poster, Title, Year, onClick }) {
  function handleClick() {

    const movieSelected = {
      imdbID, 
      Poster,
      Title,
      Year
    }

    onClick(movieSelected);
  }

  return (
    <li key={imdbID} onClick={handleClick}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
