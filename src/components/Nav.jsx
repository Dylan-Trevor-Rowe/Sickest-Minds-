import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import sickestMinds from "../data/sickestMinds.jpg";
import "./homepage.css";

export const NavBar = () => {
  return (
    <Navbar bg='white' variant='light' expand="lg">
      <Container className='navContainer'>
        <Nav.Link href='/'>
          <Image src={sickestMinds}></Image>
        </Nav.Link>
        <Nav.Link className="" href='/searchedmovies'>
        search for movies
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
