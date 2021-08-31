import React, { useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { SearchCards } from "./searchCard";

export const FetchAndSearchMovies = () => {

  const [movie, setMovie] = useState([])

  const fetchMoviesJSON = async (title) => {
    const apikey = "a65943813a1e12c1a819c1b5b846740a";
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title} +`
      );
      const movies = await response.json();
      if (movies.results.length === 0) {
        window.alert('No movie matching description')
      } else {
        setMovie(movies.results)
      }
    } catch (error) {
      console.warn(error)
    }
  };

  const textInput = useRef()

  const submitMovie = () => {
    fetchMoviesJSON(textInput.current.value)
    textInput.current.value = ''
  }
  return <>

    <Form.Control ref={textInput} className="mt-4"
      size="sm" type="text" placeholder="Small text" />
    <div className="formButton">
      <Button onClick={submitMovie} 
      className="mt-4">
      search movie
      </Button>
    </div>
    <div className="card-ClassTwo" >
      <SearchCards movie={movie} />
    </div>
  </>
};
