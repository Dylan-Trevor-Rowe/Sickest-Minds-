import React, { useRef, useContext } from "react";
import { Form, Button } from 'react-bootstrap'
import { SearchCards } from "./searchCard";
import { DataContext } from "./DataProvider";

export const FetchAndSearchMovies = () => {

  const { movie, fetchMoviesJSON } = useContext(DataContext)

  const textInput = useRef()

  const submitMovie = () => {
    // searches for relaetd movies
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
