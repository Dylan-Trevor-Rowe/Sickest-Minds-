import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { DataContext } from "./DataProvider";
const request = require('request');
const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;


export const FavoriteMoviesCards = () => {

    const {dbFavMovies, getFavoriteMovies } = useContext(DataContext)

    useEffect(() => {
    getFavoriteMovies()
    }, [])

    return <>
        {dbFavMovies.map((i) => {
            const path = i.posterPath
            return (
                <div key={i.id}>
                    <Card style={{ width: "18rem" }}>
                        <Card.Img height='400rem' variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
                        <Card.Body>
                            <Card.Title>{i.title}</Card.Title>
                            <Button variant='primary'>Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            );
        })}
    </>
};