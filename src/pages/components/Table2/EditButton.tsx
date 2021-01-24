import React from 'react';

import Button from 'react-bootstrap/Button';

import {TableContext} from '../../Tables2/TableContext';

type Props = {
  clientCat: ClientCat
  active: boolean
}

const EditButton: React.FC<Props> = (P) => {
  
  const {setEditCat} = React.useContext(TableContext) as ContextType;

  const test = {...P.clientCat};

  if(P.active === false){
    return(
      <Button
      className='fa fa-pencil icon-btn'
      variant='warning'
      onClick={() => {
        console.log('edit');
        setEditCat(test);
      }}
      />
    )
  } else {
    return(
      <React.Fragment>
        <Button
        className='fa fa-pencil icon-btn'
        variant='success'
        onClick={() => {
          setEditCat(null);
        }}
        />
        <Button
        className='fa fa-times icon-btn'
        variant='warning'
        onClick={() => {
          setEditCat(null);
        }}
        />
      </React.Fragment>
    )
  }
}

export default EditButton;