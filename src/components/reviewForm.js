import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { Rating } from 'react-simple-star-rating'
import { DataContext } from './DataProvider';


export const MovieReviewForm = (props) => {

  const [ratingState, setRating] = useState(0)
  const { id, movieId, path } = props.match.params
  const { reviewedMoviePost, updateReview, getReviewedMovies, getReviewById, reviewsById } = useContext(DataContext)
  const [localState, setLocalState] = useState({})
  const history = useHistory()

  const handleRating = (rate) => {
    setRating(rate)
  }

  useEffect(() => {
    getReviewedMovies()
    getReviewById(parseInt(id)).then((res) => {
      setLocalState(res)
      setRating(res.rating)
    })
  }, [])

  const handleControlledInputChange = (e) => {
    const newReview = Object.assign({}, localState)
    newReview[e.target.name] = e.target.value
    setLocalState(newReview)
  }

  const onClickReview = () => {

    if (id) {
      updateReview({
        userId: Number(localStorage.getItem('local_user')),
        id: parseInt(id),
        favoriteMovieId: parseInt(id),
        movieId: Number(movieId),
        rating: ratingState,
        review: localState.reviewText,
        poster: path
      })
      history.push('/')

    } else {

      reviewedMoviePost({
        userId: Number(localStorage.getItem('local_user')),
        favoriteMovieId: parseInt(id),
        movieId: Number(movieId),
        rating: localState.rating,
        review: localState.reviewText,
        poster: path

      }).then(() => {
        getReviewedMovies()
        history.push('/')
      })
    }
  }

  return <>
    <Form className=" text-center reviewForm">
      <Form.Group className="mb-3">
        <Form.Label>add your review</Form.Label>
        <Form.Control onChange={handleControlledInputChange} defaultValue={localState.review} name="reviewText" type="text" as="textarea" rows={3} />
      </Form.Group>
      <div className='mb-2'>
        <Rating onClick={handleRating} onChange={handleControlledInputChange} ratingValue={ratingState} />
      </div>
      <Button onClick={onClickReview} variant="danger">
        Submit
      </Button>
    </Form>
  </>
}