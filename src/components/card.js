import React, { useContext, useEffect }from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DataContext } from "./DataProvider";
import "./homepage.css";

export const MovieCard = () => {
  const { reviewedMovies, getReviewedMovies, releaseReview } = useContext(DataContext)

  useEffect(() => {
    getReviewedMovies()
  }, [])

  const history = useHistory();

  const releaseReviewedMovie = (e) => {
    releaseReview(e.target.value)
  }

  const filteredUserMovies = reviewedMovies.filter(movies => movies.userId === Number(localStorage.getItem('local_user')))

  return <> {filteredUserMovies.map((i, index) => {

    const path = i.poster

    const handleClick = () => history.push(`/movieCards/${i.id}/movie`)

    const editReview = () => history.push(`/movieCards/${i.id}/${i.movieId}/${path}/editreview`)

    return <>
      <div key={i.id}>
        <Card style={{ width: "18rem", minHeight: "32rem", maxHeight: "32rem", marginTop: "1rem" }}>
          <Card.Img height='400rem' variant='top' src={"https://image.tmdb.org/t/p/w500/" + '/'+path} />
          <Card.Body className="d-flex row justify-content-center">
            <Button onClick={handleClick} className="align-self-center btn-sm" variant='danger'>read review</Button>
            <Button 
            onClick={releaseReviewedMovie} 
            value={i.id} 
            className="mt-1 align-self-center btn-sm" 
            variant='dark'>
            delete review
            </Button>
            <Badge onClick={editReview} className="m-1" bg="dark">edit review</Badge>
          </Card.Body>
        </Card>
      </div>
    </>
  })}
  </>
};