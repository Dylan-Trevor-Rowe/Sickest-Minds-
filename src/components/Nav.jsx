import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import sickestMinds from "../data/sickestMinds.jpg";
import "./homepage.css";

export const NavBar = () => {
  return (
    <Navbar bg='white' variant='light' expand="lg">
      <Container className='navContainer'>
      <Image src={sickestMinds}></Image>
        <Nav.Link className="searchLink"  href='/'>
        <h4>home</h4>
        </Nav.Link>
        <Nav.Link className="searchLink" href='/searchedmovies'>
        <h4>search movies </h4>
        </Nav.Link>
        <Nav.Link className="searchLink" href='/'>
        <h4>favorites</h4>
        </Nav.Link>
        <Nav.Link className="searchLink" href='/'>
        <h4>reviews</h4>
        </Nav.Link>
      </Container>
      <Container className=' d-flex justify-content-end'>
        <SocialIcon
        className='icons'
        url='https://www.facebook.com'
        />
        <SocialIcon url='https://mail.google.com' />
      </Container>
    </Navbar>
  );
};
