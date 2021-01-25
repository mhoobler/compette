import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

import DeleteButton from './DeleteButton';

import firebase from 'firebase';

type Props = {
  catName: string
  attrs: ClientAttr[]
  item: any
}

const EditRow: React.FC<Props> = (P) => {

  const [item, setItem] = useState({...P.item});

  let isSame = () => { return JSON.stringify(P.item) === JSON.stringify(item) };

  let sorted = [...P.attrs].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  const handleSubmit = () => {
    const uid = firebase.auth().currentUser?.uid;
    const ref = uid ? firebase.database()
      .ref(`${uid}/categories/${P.catName}/items`)
      : false;
    
    if(ref){
      let update = {...item};
      delete update.key;
      // console.log(update);
      // console.log(item);
      ref.child(item.key).update(update,
        (err) => { if(err){console.log(err)} });
    }
  }

  const handleInput = (value: string, attr: string) => {
    setItem({
      ...item,
      [attr]: value
    })
  }

  return (
    <tr>
      <td>
        <Button 
        className={isSame() ? 'fa fa-check' : 'fa fa-plus'}
        variant='success'
        onClick={handleSubmit}
        disabled={isSame()}
        />
        <DeleteButton
        type='item'
        value={[P.catName, P.item.key]}
        />
      </td>
      {sorted.map( (e: ClientAttr, i: number) => {
        return (
          <td key={i}>
            <Form.Control
            type={e.type}
            maxLength={12}
            value={item[e.name]}
            onChange={(evt) => {
              let {value} = evt.currentTarget;
              handleInput(value, e.name);
            }}
            />
          </td>
        )
      })}
    </tr>
  )
}

export default EditRow;