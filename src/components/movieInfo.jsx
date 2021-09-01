import React from "react";
import { useEffect, useState } from "react";
import { Container, Image, Col } from "react-bootstrap";

export const SearchedMovieInfo = (props) => {

    const [movie, setMovie] = useState({})

    const path = movie.poster_path

    useEffect(() => {
        (async () => {
            const movieId = parseInt(props.match.params.movieId);
            const apikey = "a65943813a1e12c1a819c1b5b846740a";
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`);
                const movie = await response.json();
                console.log(movie)
                setMovie(movie)
            } catch (error) {
                console.error(error)
            }
        }) ()
    }, [])

    return (
        <Container className="text-center">
            <Col className='filteredImageContainer'>
                <Image className='filteredImage' fluid src={"https://image.tmdb.org/t/p/w500/" + path} />
            </Col>
            <h1 className='reviewText'>{movie.title}</h1>
            <h4 className='reviewText'>{movie.tagline}</h4>
            <h4 className='reviewText'> Release Date: {movie.release_date}</h4>
            <p className='reviewText'>{movie.overview}</p>
        </Container>
    );
}