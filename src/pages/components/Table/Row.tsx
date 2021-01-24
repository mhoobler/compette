import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';

import CellInput from './CellInput';
import Cell from './Cell';

type Props = {
  value: any
  attributes: any
  datakey: string
  handleEdit: any
  handleRemove: (str: any) => void
}

const Row: React.FC<Props> = (P) => {

  const [edit, setEdit] = useState(false);
  const [obj, setObj] = useState(P.value);
  const keys = P.attributes !== null ? Object.keys(P.attributes) : [];
  keys.sort( (a,b) => {
    if(P.attributes[a].priority > P.attributes[b].priority){
      return 1
    } else {
      return -1
    }
  });

  console.log(P);

  const handleInput = (elm: any) => {
    const value = elm.target.value;
    const name = elm.target.name;
    
    console.log(obj);
    var newObj = {
      ...obj,
      [name]: value
    }
    setObj(newObj);
    P.handleEdit(newObj, P.datakey);
  }

  return (
    <tr>
      <td className='text-center'>

        <Button
        className="fa fa-trash"
        value={P.datakey}
        variant='danger'
        onClick={(e) => {P.handleRemove(e.currentTarget)}}
        />
        <Button
        className="fa fa-pencil"
        value={P.datakey}
        variant='warning'
        onClick={(e) => {setEdit(!edit); P.handleEdit(obj, P.datakey)}}
        />

      </td>
      {keys.map( (e: string, i: number) => {
        if(!edit){
          if(P.attributes[e].type === 'number'){
            return (
              <CellInput
              key={i}
              name={e}
              value={P.value[e] !== undefined ? P.value[e] : 0}
              type={P.attributes[e].type}
              handleInput={handleInput}
              />
            )
          } else {
            return (
              <Cell
              key={i}
              value={obj[e] !== undefined ? P.value[e] : ''}
              />)
          }
        } else {
          return (
          <CellInput
          key={i}
          name={e}
          type={P.attributes[e].type}
          value={P.value[e] !== undefined ? P.value[e] : ''}
          handleInput={handleInput}
          />)
        }

      })}
    </tr>
  )
}

export default Row;