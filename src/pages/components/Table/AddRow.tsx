import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';

type Props = {
  attributes: any
  newEntry: any
  category: string
  handleChange: any
  handleSubmit: any
}

const AddRow: React.FC<Props> = (P) => {

  const [newEntry, setNewEntry] = useState(P.newEntry);
  console.log(P.newEntry);
  const keys = P.attributes !== null ? Object.keys(P.attributes) : [];

  useEffect( ()=>{
    console.log(P.newEntry);
    setNewEntry(P.newEntry);
  });

  keys.sort( (a,b) => {
    if(P.attributes[a].priority > P.attributes[b].priority){
      return 1
    } else {
      return -1
    }
  });

  console.log(P.attributes);

  return(
    <tr 
    id={P.category + '-add-row'}
    className='add-row'
    >
      <td className='text-center'>
        <Button 
        className='fa fa-plus'
        variant='success'
        onClick={() => {P.handleSubmit('entry')}}
        />
      </td>
      {
        keys.map( (e:string, i:number) => {
          return (
            <td className='table-input-cell' data-attribute={e} key={i}>
              <Form.Control
              type={P.attributes[e].type}
              name={e}
              value={newEntry[e]}
              onChange={(evt) => {
                P.handleChange(evt.currentTarget.value, e)
                setNewEntry({
                  ...newEntry,
                  [e]: evt.currentTarget.value
                })
              }}
              />
            </td>
          )
        })
      }
    </tr>
  )
}

export default AddRow;