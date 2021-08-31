import React from 'react'
import { Card, Button } from 'react-bootstrap';
import './homepage.css'

export const SearchCards = (props) => {
  const sliced = props.movie.slice(0, 3)
  return <> {sliced.map((i) => {
    const path = i.poster_path
    return (
      <div className="row-eq-height">
        <div key={i.id}>
          <Card className="searchCard" style={{ width: "18rem" }}>
            {path ? <Card.Img style={{ height: "15rem" }}
              variant='top' src={"https://image.tmdb.org/t/p/w500/" + path} />
              : <h1 className="d-flex align-self-center">no image</h1>}
            <Card.Body>
              <Card.Title>{i.title}</Card.Title>
              {/* <Card.Text>{i.overview}</Card.Text> */}
              <Button variant='primary'>Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  })}
  </>
}