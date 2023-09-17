/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import SummaryWatchedMovie from "./Components/SummaryWatchedMovie";
import WatchedMovieList from "./Components/WatchedMovieList";
import StarRating from "./Components/StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "812120e2";

const API_URL = `https://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const tempQuery = "interstellar";

  // useEffect(function () {
  //   console.log("After initial render");
  // }, []);

  // useEffect(function () {
  //   console.log("After every render");
  // });

  // useEffect(
  //   function () {
  //     console.log("D");
  //   },
  //   [query]
  // );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(`${API_URL}&s=${query}`, {
            signal: controller.signal,
          });

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Moive not found");
          }

          setMovies(data.Search);
        } catch (error) {
          console.log(error.message);
          // ignore abort error from AbortController after rerendering component
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
      } else {
        handleCloseMovie();
        fetchMovies();
      }

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectMovie(movieSelected) {
    setselectedId((selectedId) =>
      movieSelected.imdbID === selectedId ? "" : movieSelected.imdbID
    );
  }

  function handleCloseMovie() {
    setselectedId("");
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        {/* 
          we can use 'element' props alternative for 'children' props

          like this => alternative children into element at component

          <Box element={ <MovieList movies={movies} />} />

          <Box element={
            <>
              <SummaryWatchedMovie watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }/>
        */}

        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onClick={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId !== "" ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <SummaryWatchedMovie watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedId, watched, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isWatchedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const watchedMovieUserRating = isWatchedMovie && isWatchedMovie.userRating;

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("closing");
        }
      }
      document.addEventListener("keydown", callback);

      return () => {
        // after mounting MovieDetails component it will attach event into comonent
        // so we need remove it after unmounting
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setError("");

          setIsLoading(true);

          const res = await fetch(`${API_URL}&i=${selectedId}`);

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie is not exist");
          }

          setMovie(data);
        } catch (error) {
          // console.log(error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) {
        return;
      }
      document.title = `Movie | ${title}`;

      return () => {
        // after component unmount so state and component destroy so
        // it will be execute clean up function -> thanks to closure for accessing all the variable
        // after component destroy
        document.title = "usePopcorn";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      userRating: Number(rating),
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
    };

    onAddWatched(newMovie);
    onCloseMovie();
  }

  // console.log(
  //   title,
  //   year,
  //   poster,
  //   runtime,
  //   imdbRating,
  //   plot,
  //   released,
  //   actors,
  //   director,
  //   genre
  // );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; ${runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatchedMovie ? (
                <>
                  <StarRating
                    key={selectedId}
                    defaultRating={rating}
                    onSetRating={setRating}
                    maxRating={10}
                    size={24}
                  />

                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedMovieUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
