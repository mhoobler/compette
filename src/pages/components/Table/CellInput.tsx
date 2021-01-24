import React from 'react';
import {Form} from 'react-bootstrap';

type Props = {
  value: string
  name: string
  handleInput: any
  type: string
}

const Cell: React.FC<Props> = (P) => {

  return (
    <td className='table-input-cell'>
      <Form.Control
      defaultValue={P.value}
      name={P.name}
      type={P.type}
      onChange={(e) => {P.handleInput(e)}}
      />
    </td>
  )
}

export default Cell;