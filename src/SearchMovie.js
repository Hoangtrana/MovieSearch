import React, { useState } from "react";
import MovieCard from "./MovieCard";

// Search movie component
//form with a class of form
//lable with html="query"
//input of type text with a name of query and a place holder
//button class of button and a type of submit

function SearchMovie(props) {
  const [query, setQuery] = useState("");
  // create the state for movies and update that state appropriate
  const [movies, setMovies] = useState([]);
  const searchMovies = async (e) => {
    // state input query, movies

    e.preventDefault();
    console.log("submitting");

    //const query = "Jurassic Park";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);

      console.log(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {" "}
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card__list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}

export default SearchMovie;
