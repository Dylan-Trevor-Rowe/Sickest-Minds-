import React, { useState, createContext } from "react"
export const DataContext = createContext()

export const DataProvider = (props) => {

    const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;

    const [movie, setMovie] = useState([])
    const [dbFavMovies, setDbFavMovie] = useState([])
    const [favoriteMovie, setFavoritedMovie] = useState({})

    const fetchMoviesJSON = async (title) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieApikey}&query=${title} +`);
            const movies = await response.json()
            setMovie(movies.results)
        } catch (error) {
            console.error(error)
        }
    };

    const favoriteMoviePost = async (favoriteMoviePost) => {
        try {
            const response = await fetch('http://localhost:8080/favoriteMovies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favoriteMoviePost)
            })
            const getData = await response.json()
            return getFavoriteMovies(getData)

        } catch (error) {
            window.alert('error')
        }
    }

    const fetchNewMoviesById = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieApikey}`);
            const favoritedMovie = await response.json();
            setFavoritedMovie(favoritedMovie)
        } catch (error) {
            console.error(error)
        }
    }

    const getFavoriteMovies = async () => {
        try {
            const response = await fetch(`http://localhost:8080/favoriteMovies`);
            const Favmovies = await response.json()
            setDbFavMovie(Favmovies)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <DataContext.Provider value={{
            movie, fetchMoviesJSON, fetchNewMoviesById, favoriteMovie, favoriteMoviePost, dbFavMovies, getFavoriteMovies
        }} >
            {props.children}
        </DataContext.Provider>
    )
}