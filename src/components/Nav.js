import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { DataContext } from "./DataProvider";
import sickestMinds from "./sickestMinds.jpg";
import "./homepage.css";

export const NavBar = () => {
  const { getMovieIdList } = useContext(DataContext)

  const history = useHistory()

  const handleClick = () => {
    getMovieIdList()
  }
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Navbar className="navBar" bg='white' variant='light' expand="lg">
      <Container className='navContainer'>
        <Image src={sickestMinds}></Image>
        <Nav.Link className="searchLink" href='/home'>
          <h4>Home</h4>
        </Nav.Link>
        <Nav.Link className="searchLink" href='/searchedmovies'>
          <h4>Search Movies </h4>
        </Nav.Link>
        <Nav.Link onClick={handleClick} className="searchLink" href='/favoritemovies'>
          <h4>Favorites</h4>
        </Nav.Link>
        <Nav.Link className="searchLink" href='/reviews'>
          <h4>Reviews</h4>
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="searchLink" href='/logout'>
          <h4>logout</h4>
        </Nav.Link>
      </Container>
    </Navbar>
  );

};