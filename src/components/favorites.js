import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { DataContext } from "./DataProvider";
import { useHistory } from "react-router-dom";
import './homepage.css'

export const FavoriteMoviesCards = () => {
    
    const history = useHistory()
    const { dbFavMovies, getFavoriteMovies, releaseFavoriteMovie } = useContext(DataContext)

    useEffect(() => {
        getFavoriteMovies()
    }, [])

    const releaseMovie = (e) => {
        releaseFavoriteMovie(e.target.value)
    }

    return <>
        {dbFavMovies.map((i) => {
            const path = i.posterPath
            const handleClick = () => history.push(`/favoritemovies/${i.movieId}/`)
            return (
                <div key={i.id}>
                    <Card style={{ width: "18rem", minHeight: "32rem", maxHeight: "32rem", marginTop: "1rem" }}>
                        <Card.Img height='400rem' variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
                        <Card.Body className ="d-flex row justify-content-center">
                            <Button onClick={handleClick} className="align-self-center btn-sm" variant='danger'>movieInfo</Button>
                            <Button onClick={releaseMovie} value={i.id} className="mt-1 align-self-center btn-sm" variant='danger'>delete favorite</Button>
                        </Card.Body>
                    </Card>
                </div>
            );
        })}
    </>
};