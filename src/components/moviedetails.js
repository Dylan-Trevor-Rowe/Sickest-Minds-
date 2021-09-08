import React from "react";
import { Container, Image, Col } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { DataContext } from "./DataProvider";
import { RatingView } from 'react-simple-star-rating'

export const MovieReview = (props) => {

  const { reviewedMovies, getReviewedMovies } = useContext(DataContext)

  useEffect(() => {
    getReviewedMovies()
  }, [])

  const { movieId } = props.match.params

  const found = reviewedMovies.find(movie => movie.movieId === parseInt(movieId))

  const path = found.poster

  return (
    <Container>
      <Col className='filteredImageContainer'>
        <Image className='filteredImage' fluid src={"https://image.tmdb.org/t/p/w500/" + path} />
      </Col>
      <Col className="d-flex justify-content-center">
        <RatingView ratingValue={found.rating} />
      </Col>
      <p className='reviewText text-center'>{found.review}</p>
    </Container>
  );
};
