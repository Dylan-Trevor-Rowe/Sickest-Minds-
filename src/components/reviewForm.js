import React, { useRef, useState, useContext, useEffect } from 'react'
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { Rating, RatingView } from 'react-simple-star-rating'
import { DataContext } from './DataProvider';


export const MovieReviewForm = (props) => {
  const [rating, setRating] = useState(0)
  const { id, movieId, path } = props.match.params
  const { reviewedMoviePost, reviewedMovies, updateReview, getReviewedMovies } = useContext(DataContext)
  const textInput = useRef()
  const history = useHistory()

  const handleRating = (rate) => {
    setRating(rate)
  }

  useEffect(() => {
    getReviewedMovies()
  }, [])

  const onClickReview = () => {

    const reviewBody = {
      favoriteMovieId: parseInt(id),
      movieId: Number(movieId),
      rating: rating,
      review: textInput.current.value,
      poster: path
    }
    reviewedMoviePost(reviewBody).then(() => {
      getReviewedMovies()
      history.push('/')
    })
  }

  return <>
    <Form className=" text-center reviewForm">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>add your review</Form.Label>
        <Form.Control ref={textInput} as="textarea" rows={3} />
      </Form.Group>
      <div className='mb-2'>
        <Rating onClick={handleRating} ratingValue={rating} />
      </div>
      <Button onClick={onClickReview} variant="danger">
        Submit
      </Button>
    </Form>
  </>
}