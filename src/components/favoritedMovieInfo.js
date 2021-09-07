import React from "react";
import { useEffect, useState } from "react";
import { Container, Image, Col, ListGroup } from "react-bootstrap";
import './homepage.css'

export const FavoritedMovieInfo = (props) => {
    const [favoriteMovieInfo, setFavoritedMovieInfo] = useState({})
    const [movieCredits, setMovieCreditInfo] = useState([])

    useEffect(() => {
        (async () => {
            const { movieId } = props.match.params
            const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieApikey}`);
                const favMovieInfo = await response.json();
                setFavoritedMovieInfo(favMovieInfo)
            } catch (error) {
                console.error(error)
            }

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${movieApikey}`);
                const movieCredits = await response.json();
                const sliced = movieCredits.cast.slice(0, 5)
                setMovieCreditInfo(sliced)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const path = favoriteMovieInfo.poster_path

    return <>

        <Container className="text-center">
            <Col className='filteredImageContainer'>
                <Image className='filteredImage' fluid src={"https://image.tmdb.org/t/p/w500/" + path} />
            </Col>
            <h1 className='reviewText'>{favoriteMovieInfo.title}</h1>
            <h4 className='reviewText'>{favoriteMovieInfo.tagline}</h4>
            <h4 className='reviewText'> Release Date: {favoriteMovieInfo.release_date}</h4>
            <p className='reviewText'>{favoriteMovieInfo.overview}</p>
        </Container>
        <Container className="d-flex justify-content-center">
        <h3 className="castH3 text-center">Starring:</h3>
            {movieCredits.map((i) => {
                return (
                    <div key={i.id}>
                        <ListGroup>
                            <p className="castList">{i.name},</p>
                        </ListGroup>
                    </div>
                );
            })}
        </Container>
    </>
}