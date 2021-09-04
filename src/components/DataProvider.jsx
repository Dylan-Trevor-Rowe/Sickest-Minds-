import React, { useState, createContext } from "react"
export const DataContext = createContext()
const request = require('request');

export const DataProvider = (props) => {

    const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;

    const [movie, setMovie] = useState([])
    const [movieId, setMovieIdList] = useState([])

    const fetchMoviesJSON = async (title) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieApikey}&query=${title} +`);
            const movies = await response.json()
            return setMovie(movies.results)
        } catch (error) {
            console.error(error)
        }
    };

    const movieIdPost = async (id) => {
        try {
            const jsonNote = JSON.stringify(id)
            return fetch('http://localhost:8080/id', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonNote
            })

        } catch (error) {
            window.alert('error')
        }
    }

    const getMovieIdList = async () => {
        try {
            const response = await fetch(`http://localhost:8080/id`);
            const movieId = await response.json()
            return setMovieIdList(movieId)
        } catch (error) {
            console.error(error)
        }
    }

    let moviesToReturn = []
    
    let requests = movieId.map(id => {
        return new Promise((resolve, reject) => {
            request({
                url: `https://api.themoviedb.org/3/movie/${id.movieId}?api_key=${movieApikey}`,
                method: 'GET'
            },
                (err, res, body) => {
                    if (err) { reject(err) }                           //function passed to the promise
                    resolve(body)
                })
        })
    })

    Promise.all(requests).then((body) => {
        body.forEach(res => {
            console.log(res, 'res')
            if (res)
                moviesToReturn.push(JSON.parse(res))
            console.log(moviesToReturn, 'movies to return', typeof moviesToReturn)
        })
    }).catch(err => console.log(err))

    return (
        <DataContext.Provider value={{
            movie, fetchMoviesJSON, movieIdPost, getMovieIdList, movieId,
        }} >
            {props.children}
        </DataContext.Provider>
    )
}