import React, { useState, createContext } from "react"
export const DataContext = createContext()

export const DataProvider = (props) => {

    const [movie, setMovie] = useState([])
    const [movieId, setMovieIdList] = useState([])

    const fetchMoviesJSON = async (title) => {
        const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;
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
            console.log(movieId)
            return setMovieIdList(movieId)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <DataContext.Provider value={{
            movie, fetchMoviesJSON, movieIdPost, getMovieIdList, movieId
        }} >
            {props.children}
        </DataContext.Provider>
    )
}