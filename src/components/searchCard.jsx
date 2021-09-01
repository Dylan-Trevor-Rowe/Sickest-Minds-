import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './homepage.css'

export const SearchCards = (props) => {
  
  const history = useHistory()

  const sliced = props.movie.slice(0, 3)

  return <> {sliced.map((i, index) => {

    const path = i.poster_path

    const handleClick = () => history.push(`/searchedmovies/${i.id}/movieInfo`)

    return (
      <div className="row-eq-height">
        <div key={index}>
          <Card className="searchCard" style={{ width: "18rem" }}>
            {path ? <Card.Img style={{ height: "15rem" }}
              variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
              : <h1 className="d-flex align-self-center">no image</h1>}
            <Card.Body>
              <Card.Title>{i.title}</Card.Title>
              <Button onClick={handleClick} variant='primary'>Movie info</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  })}
  </>
}