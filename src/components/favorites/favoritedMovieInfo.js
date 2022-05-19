import React from "react";
import { useEffect, useState } from "react";
import { Container, Image, Col, ListGroup } from "react-bootstrap";
import '../homepage.css'

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
            <h5 className='reviewText'>{favoriteMovieInfo.tagline}</h5>
            <h5 className='reviewText'> Release Date: {favoriteMovieInfo.release_date}</h5>
            <h5 className='reviewText'>{favoriteMovieInfo.overview}</h5>
        </Container>
        <Container className="d-flex flex-wrap fluid justify-content-center">
            <h5 className="castH3 text-center m-1">Starring:</h5>
            {movieCredits.map((i) => {
                return (
                    <div key={i.id}>
                        <ListGroup>
                            {movieCredits.indexOf(i) < movieCredits.length - 1 ? <p className="castList">{i.name},</p> 
                            : <p className="castList">{i.name}</p>}
                        </ListGroup>
                    </div>
                );
            })}
        </Container>
    </>
}   