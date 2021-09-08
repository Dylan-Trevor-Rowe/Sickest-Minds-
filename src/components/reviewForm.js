import React, { useRef, useState, useContext } from 'react'
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { Rating, RatingView } from 'react-simple-star-rating'
import { DataContext } from './DataProvider';


export const MovieReviewForm = (props) => {
    const [rating, setRating] = useState(0) // initial rating value
    const { movieReviewId } = props.match.params
    const { dbFavMovies, reviewedMoviePost } = useContext(DataContext)
    const textInput = useRef()
    const history = useHistory()

    const handleRating = (rate) => {
        setRating(rate)
    }

    const onClickReview = () => {
        const foundMovieObject = dbFavMovies.find(movie => movie.movieId === Number(movieReviewId))

        const reviewBody = {
            movieId: Number(movieReviewId),
            rating: rating,
            review: textInput.current.value,
            poster: foundMovieObject.posterPath
        }
        reviewedMoviePost(reviewBody).then(() => {
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