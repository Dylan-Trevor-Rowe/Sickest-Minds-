import React, { useState, createContext } from "react"
export const DataContext = createContext()

export const DataProvider = (props) => {

    const [movie, setMovie] = useState([])

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

    return (
        <DataContext.Provider value={{
            movie, fetchMoviesJSON
        }} >
            {props.children}
        </DataContext.Provider>
    )
}