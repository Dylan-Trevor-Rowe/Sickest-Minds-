import React from "react";
import { Container, Image, Col } from "react-bootstrap";
import { MovieArray } from "../data/data";

export const MovieReview = (props) => {
  const movieId = parseInt(props.match.params.movieId);
  const filterMovie = MovieArray.find((movie) => movie.id === movieId);
  return (
    <Container>
      <Col className='filteredImageContainer'>
        <Image src={filterMovie.image} className='filteredImage' fluid />
      </Col>
      <p className='reviewText'>{filterMovie.review}</p>
    </Container>
  );
};
