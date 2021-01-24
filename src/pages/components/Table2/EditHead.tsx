import React, { useState } from 'react';
import { 
  Form,
  Button,
  ButtonGroup
} from 'react-bootstrap';

import DeleteButton from './DeleteButton';

import firebase from 'firebase';

type Props = {
  attributes: ClientAttr[]
  catName: string
}

const EditHead: React.FC<Props> = (P) => {
  const [newAttr, setNewAttr] = useState({
    name: '',
    type: 'text',
    priority: 1
  });

  let sorted = [...P.attributes].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  const handleSubmit = () => {
    let uid = firebase.auth().currentUser?.uid;
    let ref = uid ? firebase.database().ref(`${uid}/categories/${P.catName}`) : false;
    console.log(newAttr);

    let isSafe = true;
    let attrObj: any = {};
    let highest = 1;
    for(let a of P.attributes){
      if(a.name !== newAttr.name){

        if(a.priority > highest){
          highest = a.priority + 1;
        }
        attrObj[a.name] = {...a};
        delete attrObj[a.name].name;

      } else {

        alert(`Sorry, this table already has the attribute: ${a.name}`);
        setNewAttr({
          name: '',
          type: 'text',
          priority: 1
        });
        isSafe = false;
        break;

      }
    }
    


    if(ref && isSafe && newAttr.name !== ''){
      attrObj[newAttr.name] = {priority: highest, type: newAttr.type.toLowerCase()}
      ref.child('attributes').set(attrObj);
    }
  }

  return(
    <tr>
      <th></th>
      {sorted.map( (e: ClientAttr, i:number) => {
        return (
          <th key={i}>
            <span>{e.name}</span>
            <DeleteButton type='attribute' value={[P.catName, e.name]}/>
          </th>
        )
      })}
      <th>
        <ButtonGroup>
          <Button 
          className='fa fa-plus'
          variant='success'
          onClick={handleSubmit}
          >
          </Button>
          <Form.Control
          as='select'
          onChange={(evt) => setNewAttr({
            ...newAttr,
            type: evt.currentTarget.value
          })}
          style={ {width: '80%'} }
          >
            <option>Text</option>
            <option>Number</option>
          </Form.Control>
          <Form.Control
          type='text'
          value={newAttr.name}
          onChange={(evt) => setNewAttr({
            ...newAttr,
            name: evt.currentTarget.value
          })}
          style={ {width: '80%'} }
          />
        </ButtonGroup>
      </th>
    </tr>
  )
}

export default EditHead;