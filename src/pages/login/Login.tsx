import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    <div>
      <h3>Login</h3>

      <form>
        <button
        onClick={(e) => handleSubmit(e)}
        value={'Google'}
        >Google</button>
        <button
        onClick={(e) => handleSubmit(e)}
        value={'Anonymous'}
        >Anonymous</button>
      </form>
    </div>
  )
}

export default Login;