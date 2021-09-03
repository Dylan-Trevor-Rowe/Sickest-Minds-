import React, { useContext, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DataContext } from "./DataProvider";
import './homepage.css'

export const SearchCards = (props) => {

  const { movieIdPost, getMovieIdList, movieId } = useContext(DataContext)

  useEffect(() => {
    getMovieIdList()
  }, [])

  const history = useHistory()

  const sliced = props.movie.slice(0, 3)

  const clickEvent = async (e) => {
    const mapped = movieId.map(val => val.movieId)

    if (mapped.includes(parseInt(e.target.value))) {
      window.alert('already favorited')

    } else {
      const idPost = { movieId: parseInt(e.target.value) }
      movieIdPost(idPost)
      window.alert('added to favorites')
      await getMovieIdList()
    }
  }

  return <> {sliced.map((i, index) => {
    const path = i.poster_path

    const handleClick = () => history.push(`/searchedmovies/${i.id}/movieInfo`)
    
    return (
      <div key={index}>
        <div className="row-eq-height">
          <Card className="searchCard" style={{ width: "18rem" }}>
            {path ? <Card.Img style={{ height: "15rem" }}
              variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
              : <h1 className="d-flex align-self-center">no image</h1>}
            <Card.Body className="buttonContainer">
              <Card.Title>{i.title}</Card.Title>
              <Button className="infoButton" onClick={handleClick} variant='primary'>Movie info</Button>
              <Button onClick={clickEvent} value={i.id} className="favoriteButton">add to favorites</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  })}
  </>
}