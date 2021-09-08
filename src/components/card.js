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

  return <> {reviewedMovies.map((i) => {

    const path = i.poster

    const handleClick = () => history.push(`/movieCards/${i.movieId}/movie`)
    return (
      <div key={i.id}>
        <Card style={{ width: "18rem", minHeight: "32rem", maxHeight: "32rem", marginTop: "1rem" }}>
          <Card.Img height='400rem' variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
          <Card.Body className="d-flex row justify-content-center">
            <Button onClick={handleClick} className="align-self-center btn-sm" variant='danger'>read review</Button>
            <Button onClick={releaseReviewedMovie} value={i.id} className="mt-1 align-self-center btn-sm" variant='dark'>delete review</Button>
            <Badge className="m-1" bg="dark">edit review</Badge>
          </Card.Body>
        </Card>
      </div>
    );
  })}
  </>
};