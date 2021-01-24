import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button'

import firebase from 'firebase';

type Props = {
  type: string
  value: string[]
}

const DeleteButton: React.FC<Props> = (P) => {
  const [double, setDouble] = useState(false);
  const timerRef = useRef<any>(null);

  const setTimer = () => {
    timerRef.current = setTimeout( () => {
      setDouble(false);
    }, 750)
  }

  const handleDelete = () => {
    var uid = firebase.auth().currentUser!.uid;

    if(double){
      timerRef.current = null;
      switch(P.type){
        case('item'):{
          console.log(P.value);

          let ref = firebase.database().ref(`${uid}/categories/${P.value[0]}/items`);
          ref.child(
            P.value[1]).set({},
            (err) => { if(err){console.log(err)} }
          );
          break;
        };
        case('category'):{
          console.log(P.value);
          let prompt = window.prompt(`Whoa! Are you sure you want to delete Table "${P.value[0]}" and all it's entries\nIf so pleasse type: ${P.value[0]} `);

          if(prompt === P.value[0]){
            let ref = firebase.database().ref(`${uid}/categories`);
            ref.child(
              P.value[0]).set({},
              (err) => { if(err){console.log(err)} }
            );
          }
          break;
        };
        case('attribute'):{
          console.log(P.value);
          let ref = firebase.database().ref(`${uid}/categories/${P.value[0]}/attributes`);
          ref.child(
            P.value[1]).set({},
            (err) => { if(err){console.log(err)} }
          );
          break;
        }
      };
    }

  }

  return (
    <Button
    className='fa fa-trash'
    variant={double ? 'super-danger' : 'danger'}
    onClick={() => {
      handleDelete();
      setDouble(true);
      setTimer();
    }}
    />
  )
}

export default DeleteButton;