import React, { useState } from 'react';
import { 
  Button,
  ButtonGroup
} from 'react-bootstrap';

import DeleteButton from './DeleteButton';
import NewAttrModal from './NewAttrModal';

type Props = {
  attributes: ClientAttr[]
  catName: string
}

const EditHead: React.FC<Props> = (P) => {
  const [show, setShow] = useState(false);

  let sorted = [...P.attributes].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });



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
          variant='success'
          // onClick={handleSubmit}
          onClick={() => setShow(true)}
          >
            Add New Attribute
          </Button>
          <NewAttrModal
          show={show}
          handleClose={() => setShow(false)}
          attributes={P.attributes}
          catName={P.catName}
          />
        </ButtonGroup>
      </th>
    </tr>
  )
}

export default EditHead;