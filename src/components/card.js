import React from "react";
import { Card, Button } from "react-bootstrap";
import { MovieArray } from "../data/data";
import { useHistory } from "react-router-dom";
import "./homepage.css";

export const MovieCard = () => {
  const history = useHistory();
  return <> {MovieArray.map((i) => {
      const handleClick = () => history.push(`/movieCards/${i.id}/movie`)
        return (
          <div key={i.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img height='400rem' variant='top' src={i.image} />
              <Card.Body>
                <Card.Title>{i.Title}</Card.Title>
                <p>Director: {i.Director}</p>
                <Card.Text>{i.description}</Card.Text>
                  <Button onClick={handleClick} variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
  </>
};
