import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import firebase from 'firebase/app';
import 'firebase/auth';

import './nav.css';

type Props = {
  authed: boolean
}

const NavComp: React.FC<Props> = (P) => {

  if(P.authed){
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav activeKey="/home">
          <Nav.Item>
            <Nav.Link
            href="/">
              Home
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link 
            href='/testing'>
              Testing
            </Nav.Link>
          </Nav.Item> */}
          {/* <Nav.Item>
            <Nav.Link 
            href='/clock'>
              Clock
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link 
            href='/'
            onClick={() => firebase.app().auth().signOut()}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
  )
  } else {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav activeKey="/home">
          <Nav.Item>
            <Nav.Link
            href="/">
              Home
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    )
  }


}

export default NavComp;