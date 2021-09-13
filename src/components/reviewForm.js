import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { DataContext } from './DataProvider';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const MovieReviewForm = (props) => {

  const { id, movieId, path } = props.match.params
  const { reviewedMoviePost, updateReview, getReviewedMovies, getReviewById } = useContext(DataContext)
  const [localState, setLocalState] = useState({})
  const [defaultState, setDefaultState] = useState({})
  const [defaultReviewState, setDefaultReviewState] = useState({})
  const [value, setValue] = React.useState(5);
  const history = useHistory()

  useEffect(() => {
    getReviewedMovies()
    if (id) {
      getReviewById(parseInt(id)).then((res) => {
        setLocalState(res)
        setDefaultState(res.rating)
        setDefaultReviewState(res)
      })
    }
  }, [])

  const handleControlledInputChange = (e) => {
    const newReview = Object.assign({}, localState)
    newReview[e.target.name] = e.target.value
    setLocalState(newReview)
  }

  const handleControlledInputChangeTwo = (e) => {
    const newReviewState = Object.assign({}, defaultReviewState)
    newReviewState[e.target.name] = e.target.value
    setDefaultReviewState(newReviewState)
  }

  const onClickReview = () => {

    if(id) {
      if (defaultReviewState.defaultReviewState === undefined) {
        updateReview({
          userId: Number(localStorage.getItem('local_user')),
          id: parseInt(id),
          favoriteMovieId: parseInt(id),
          movieId: Number(movieId),
          rating: defaultState,
          review: defaultReviewState.review,
          poster: path
        })
        history.push('/home')

      } else {
        updateReview({
          userId: Number(localStorage.getItem('local_user')),
          id: parseInt(id),
          favoriteMovieId: parseInt(id),
          movieId: Number(movieId),
          rating: defaultState,
          review: defaultReviewState.defaultReviewState,
          poster: path
        })
        history.push('/home')
      }
    } else {
      reviewedMoviePost({
        userId: Number(localStorage.getItem('local_user')),
        favoriteMovieId: parseInt(id),
        movieId: Number(movieId),
        rating: value,
        review: localState.reviewText,
        poster: path

      }).then(() => {
        getReviewedMovies()
        history.push('/home')
      })
    }
  }

  if(id) {
    return (
      <>
        <Form className=" text-center reviewForm">
          <Form.Group className="mb-3">
            <Form.Label>add your review</Form.Label>
            <Form.Control onChange={handleControlledInputChangeTwo} defaultValue={defaultReviewState.review} name="defaultReviewState" type="text" as="textarea" rows={3} />
          </Form.Group>
          <div className='mb-2'>
            <Box component="fieldset" mb={3} borderColor="primary.main">
              <Typography component="legend">how many starz</Typography>
              <Rating
                name="rating"
                value={defaultState}
                onChange={(event, newValue) => {
                setDefaultState(newValue);
                }}
              />
            </Box>
          </div>
          <Button onClick={onClickReview} variant="danger">
            Submit
          </Button>
        </Form>
      </>
    )
  } else {
    return (
      <>
        <Form className=" text-center reviewForm">
          <Form.Group className="mb-3">
            <Form.Label>add your review</Form.Label>
            <Form.Control onChange={handleControlledInputChange} defaultValue={localState.review} name="reviewText" type="text" as="textarea" rows={3} />
          </Form.Group>
          <div className='mb-2'>
            <Box component="fieldset" mb={3} borderColor="primary.main">
              <Typography component="legend">how many starz</Typography>
              <Rating
                name="rating"
                defaultValue={value}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </div>
          <Button onClick={onClickReview} variant="danger">
            Submit
          </Button>
        </Form>
      </>
    )
  }
}