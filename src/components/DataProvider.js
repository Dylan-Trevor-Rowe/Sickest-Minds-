import React, { useState, createContext } from "react"
export const DataContext = createContext()

export const DataProvider = (props) => {

    const movieApikey = process.env.REACT_APP_MOVIE_API_KEY;
    const [movie, setMovie] = useState([])
    const [dbFavMovies, setDbFavMovie] = useState([])
    const [favoriteMovie, setFavoritedMovie] = useState({})
    const [reviewedMovies, setReviewedMovies] = useState([])
    const [reviewsById, setReviewById] = useState({})

    const fetchMoviesJSON = async (title) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieApikey}&query=${title} +`);
            const movies = await response.json()
            if (movies.results.length === 0) {
                window.alert('no matching movie')
            } else {
                setMovie(movies.results)
            }

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

    const reviewedMoviePost = async (review) => {
        try {
            await fetch('http://localhost:8080/review', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            })
            return getReviewedMovies()

        } catch (error) {
            window.alert('error')
        }
    }

    const getReviewedMovies = async () => {
        try {
            const response = await fetch(`http://localhost:8080/review`);
            const movies = await response.json()
            setReviewedMovies(movies)
        } catch (error) {
            console.error(error)
        }
    };

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
    const getReviewById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/review/${id}`);
            const reviewById = await response.json()
            setReviewById(reviewById)
            return reviewById
        } catch (error) {
            console.error(error)
        }
    };

    const releaseFavoriteMovie = (id) => {
        return fetch(`http://localhost:8080/favoriteMovies/${id}`, {
            method: 'DELETE',
        }).then(getFavoriteMovies)
    }
    const releaseReview = (id) => {
        return fetch(`http://localhost:8080/review/${id}`, {
            method: 'DELETE',
        }).then(getReviewedMovies)
    }

    const updateReview = async id => {
        const result = await fetch(`http://localhost:8080/review/${id.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
        return getReviewedMovies(result)

    }

    return (
        <DataContext.Provider value={{
            movie, fetchMoviesJSON, fetchNewMoviesById, favoriteMovie,
            favoriteMoviePost, dbFavMovies, getFavoriteMovies, releaseFavoriteMovie,
            reviewedMovies, getReviewedMovies, reviewedMoviePost, releaseReview, updateReview,
            getReviewById, reviewsById
        }} >
            {props.children}
        </DataContext.Provider>
    )
}