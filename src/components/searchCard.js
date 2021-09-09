import React, { useContext, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { useHistory } from 'react-router-dom';
import { DataContext } from "./DataProvider";
import './homepage.css'

export const SearchCards = (props) => {

  const { fetchNewMoviesById, favoriteMoviePost, dbFavMovies, getFavoriteMovies } = useContext(DataContext)

  useEffect(() => {
    getFavoriteMovies()
  }, [])

  const makePostRequest = (e) => {
    const movieId = dbFavMovies.map(id => id.movieId)
    if (movieId.includes(parseInt(e.target.id))) {
      window.alert('already a favorite')

    } else {

      const postObject = {
        movieId: parseInt(e.target.id),
        title: e.target.value,
        posterPath: e.target.name
      }
      favoriteMoviePost(postObject)
      window.alert('added to favorites')  
    }
  }

  const history = useHistory()

  const sliced = props.movie.slice(0, 3)

  const clickEvent = async (e) => {

    await fetchNewMoviesById(parseInt(parseInt(e.target.id))).then(() => {
      makePostRequest(e)
    })
  } 

  return <> {sliced.map((i, index) => {
    const path = i.poster_path

    const handleClick = () => history.push(`/searchedmovies/${i.id}/movieInfo`)

    return (
      <div key={index}>
        <div className="row-eq-height">
          <Card className="searchCard" style={{ width: "18rem" }}>
            <Card.Img style={{ height: "15rem" }}
              variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
            <Card.Body className="buttonContainer">
              <Card.Title>{i.title}</Card.Title>
              <Button className="infoButton" onClick={handleClick} variant='primary'>Movie info</Button>
              <Button onClick={clickEvent} name={path} value={i.title} id={i.id} className="favoriteButton">add to favorites</Button>
            </Card.Body>
          </Card>
        </div>  
      </div>
    );
  })}
  </>
}