/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched?.map((item) => (
        <WatchedMovie
          onDeleteWatched={onDeleteWatched}
          key={item.imdbID}
          {...item}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
