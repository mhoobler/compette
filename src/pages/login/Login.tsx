import React from 'react';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';


import firebase from 'firebase/app';

import './login.css';

const Login: React.FC = () => {

  const handleSubmit = (e: any) => {
    const {value} = e.currentTarget 
    e.preventDefault();

    switch(value){
      case('Anonymous'): {
        firebase.auth().signInAnonymously();
        console.log(firebase.auth().currentUser);
        break;
      }
      case('Google'): {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
        break;
      }
    } 

    console.log(value);
  }

  return (
    <div id='login-page'>
      <Row className='justify-content-center'>
        <Col className='text-center title-container' lg='4'>
          <h1>Compe<span className='fa fa-table'/>e</h1>
          <p>A one stop shop for personal productivity</p>
        </Col>
      </Row>

      <Row className='justify-content-center'>

        <Col className='text-center' lg='2'>
          <ul>
            <li>
              <Button
              onClick={(e) => handleSubmit(e)}
              value={'Google'}
              >
                Sign In
              </Button>
            </li>
            <li>
              <Button
              onClick={(e) => handleSubmit(e)}
              value={'Anonymous'}
              >
                Try it out!
              </Button>
            </li>
          </ul>
        </Col>

      </Row>
    </div>
  )
}

export default Login;