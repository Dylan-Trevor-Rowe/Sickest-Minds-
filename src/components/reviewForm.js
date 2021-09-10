import React, { useRef, useState, useContext, useEffect } from 'react'
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { Rating, RatingView } from 'react-simple-star-rating'
import { DataContext } from './DataProvider';


export const MovieReviewForm = (props) => {

  const [localState, setLocalState] = useState({})
  const [rating, setRating] = useState(0)
  const { id, movieId, path } = props.match.params
  const { reviewedMoviePost, updateReview, getReviewedMovies } = useContext(DataContext)

  console.log(props.match.params)

  const history = useHistory()

  const handleRating = (rate) => {
    setRating(rate)
  }

  useEffect(() => {
    getReviewedMovies()
  }, [])

  const handleControlledInputChange = (e) => {
    const newReview = Object.assign({}, localState)
    newReview[e.target.name] = e.target.value
    setLocalState(newReview)
  }

  const onClickReview = () => {
    
    if (id) {

      updateReview({
        id: parseInt(id),
        favoriteMovieId: parseInt(id),
        movieId: Number(movieId),
        rating: rating,
        review: localState.reviewText,
        poster: path
      })
      
      history.push('/')

    } else {


      reviewedMoviePost({
        favoriteMovieId: parseInt(id),
        movieId: Number(movieId),
        rating: rating,
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
        <Form.Control onChange={handleControlledInputChange} defaultValue={localState.reviewText} name="reviewText" type="text" as="textarea" rows={3} />
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