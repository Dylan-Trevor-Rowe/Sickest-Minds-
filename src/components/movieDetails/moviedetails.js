import React from "react";
import { Container, Image, Col } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { DataContext } from "../data/DataProvider";
import Rating from '@material-ui/lab/Rating';

export const MovieReview = (props) => {
  
  const { reviewedMovies, getReviewedMovies } = useContext(DataContext)

  useEffect(() => {
    getReviewedMovies()
  }, [])

  const {id} = props.match.params

  const reviews = reviewedMovies.find(movie => movie.id === Number(id))

  const path = reviews.poster

  return (
    <Container>
      <Col className='filteredImageContainer'>
        <Image className='filteredImage' fluid src={"https://image.tmdb.org/t/p/w500/" + path} />
      </Col>
      <Col className="d-flex justify-content-center">
      <Rating name="read-only" value={reviews.rating} readOnly />
      </Col>
      <p className='reviewText text-center'>{reviews.review}</p>
    </Container>
  );
};