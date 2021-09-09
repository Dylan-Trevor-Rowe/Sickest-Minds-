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

  const movieId  = props.match.params
  const foundReviews = reviewedMovies.find(review => parseInt(movieId.id) === review.movieId)
  const path = foundReviews.poster

  return (
    <Container>
      <Col className='filteredImageContainer'>
        <Image className='filteredImage' fluid src={"https://image.tmdb.org/t/p/w500/" + path} />
      </Col>
      <Col className="d-flex justify-content-center">
        <RatingView ratingValue={foundReviews.rating} />
      </Col>
      <p className='reviewText text-center'>{foundReviews.review}</p>
    </Container>
  );
};