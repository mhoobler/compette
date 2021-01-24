import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

import {TableContext} from '../../Tables2/TableContext';

import firebase from 'firebase';

type Props = {
  type: string
  item: any
  attrName: string
  catName: string
}

const InputCell: React.FC<Props> = (P) => {
  const targetItem = (React.useContext(TableContext) as ContextType)
    .categories[P.catName].items[P.item.key];
  const {userID} = React.useContext(TableContext) as ContextType;


  const handleUpdate = (val: string | number) => {
    let ref = firebase.database().ref(`${userID}/categories/${P.catName}/items`);

    ref.child(P.item.key).update({
      ...targetItem,
      [P.attrName]: val
    });
  } 

  return (
    <td>
      <Form.Control
      className='subtle-input'
      type={P.type}
      defaultValue={P.item[P.attrName]}
      onChange={ (evt) => {
        let value = evt.currentTarget.value
        handleUpdate(value);
      } }
      />
    </td>
  )
}

export default InputCell;
