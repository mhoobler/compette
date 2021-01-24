import React, { useState, useEffect } from 'react';

import firebase from 'firebase';

const UpdateTest: React.FC = () => {

  const [test, setTest] = useState(['']);
  var user = firebase.auth().currentUser;
  const uid = user === null ? '' : user.uid;
  const path = uid + '/categories/Test2';
  const itemsRef = firebase.database().ref(path + '/items');

  useEffect( () => {
    itemsRef.on('value', (snapshot) => {
      const val = snapshot.val();
      const keys = val !== null ? Object.keys(val) : [''];

      setTest(keys);
    })
  }, [])

  return(
    <div>
      <div>UpdateTest</div>
      {test.map( (e: any, i: number) => {
        return <div key={i}>{e}</div>
      })}
    </div>
  )
}

export default UpdateTest;