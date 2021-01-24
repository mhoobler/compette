import React, {useState} from 'react';

import {
  Form,
  Button
} from 'react-bootstrap';

import firebase from 'firebase';

type Props = {
  catName: string
  attrs: ClientAttr[]
}

const AddOneRow: React.FC<Props> = (P) => {

  const [item, setItem] = useState({});

  let sorted = [...P.attrs].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  const handleSubmit = () => {
    console.log(item)
    let uid = firebase.auth().currentUser?.uid;
    let ref = uid ? firebase.database()
              .ref(`${uid}/categories/${P.catName}/items`)
              :
              false;

    if(ref){
      ref.push(item);
    }
  }

  return (
    <tr>
      <td>
        <Button 
        className='fa fa-plus'
        variant='success'
        onClick={handleSubmit}
        />
      </td>
      {sorted.map( (e: ClientAttr, i:number) => {
        return (
          <td key={i}>
            <Form.Control
            type={e.type}
            maxLength={12}
            onChange={ (evt) => {
              setItem({
                ...item,
                [e.name]: evt.currentTarget.value 
              })
            }}
            />
          </td>
        )
      })}
    </tr>
  )
} 

export default AddOneRow;