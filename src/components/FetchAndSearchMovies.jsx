import { apiKey } from "./.secret/apiKey";
import React, { useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { SearchCards } from "./searchCard";

export const FetchAndSearchMovies = () => {

  const [movie, setMovie] = useState([])

  const fetchMoviesJSON = async (title) => {
    const movieApikey = apiKey;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieApikey}&query=${title} +`
      );
      const movies = await response.json();
      
      movies.results.length === 0 ? window.alert('No movie matching description') 
      : setMovie(movies.results)

    } catch (error) {
      console.error(error)
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
