import React, { useContext, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { DataContext } from "./DataProvider";
import { useHistory } from "react-router-dom";
import './homepage.css'

export const FavoriteMoviesCards = () => {

  const history = useHistory()
  const { dbFavMovies, getFavoriteMovies, releaseFavoriteMovie } = useContext(DataContext)

  useEffect(() => {
    getFavoriteMovies()
  }, [])

  const releaseMovie = (e) => {
    releaseFavoriteMovie(e.target.value)
  }

  return <>
    {dbFavMovies.map((i) => {
      const poster = i.posterPath
      const path = i.posterPath.split('/')
      const [delimiter, string ] = path
  
      const handleClick = () => history.push(`/favoritemovies/${i.movieId}/`)
      const movieForm = () => history.push(`favoritemovies/${string}/${i.movieId}/moviereview`)
      return (
        <div key={i.id}>
          <Card style={{ width: "18rem", minHeight: "32rem", maxHeight: "32rem", marginTop: "1rem" }}>
            <Card.Img height='400rem' variant='top' src={"https://image.tmdb.org/t/p/w500/" + poster} />
            <Card.Body className="d-flex row justify-content-center">
              <Button onClick={handleClick} className="align-self-center btn-sm" variant='danger'>movieInfo</Button>
              <Button onClick={releaseMovie} value={i.id} className="mt-1 align-self-center btn-sm" variant='dark'>delete favorite</Button>
              <Badge onClick={movieForm} className="m-1" bg="dark">review movie</Badge>
            </Card.Body>
          </Card>
        </div>
      );
    })}
  </>
};