/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Movie from "./Movie";

function MovieList({ movies, onClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((item) => (
        <Movie
          onClick={onClick}          
          key={item.imdbID}
          {...item}
        />
      ))}
    </ul>
  );
}

export default MovieList;
