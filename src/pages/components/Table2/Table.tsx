import React, {useEffect, useState} from 'react';

import {
  Table as BStable,
  Row,
  Col
} from 'react-bootstrap';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import AddOneRow from './AddOneRow';

import TableHead from './TableHead';
import TableRow from './TableRow';

import firebase from 'firebase';

type Props = {
  clientCat: ClientCat
  edit: boolean
}

const Table: React.FC<Props> = (P) => {
  const test = {...P.clientCat};
  const {items} = test;



  return (
    <div>
      <Row>
        <Col>
          
          <h3>
            <span>
              <EditButton 
              clientCat={test} 
              active={false}
              />
            </span>
            {P.clientCat.name}: {P.edit.toString()}
          </h3>

        </Col>
      </Row>

      <BStable  striped bordered hover size="sm" variant='dark' responsive='md' >
        <thead>
        <TableHead attributes={P.clientCat.attributes} />
        </thead>

        <tbody>
        {items ?
          items.map( (e: any) => {
            
            return (
              <TableRow 
              catName={P.clientCat.name}
              attributes={P.clientCat.attributes} 
              item={e} 
              key={e.key} 
              />
            )

          })
          :
          null
        }
        <AddOneRow catName={P.clientCat.name} attrs={P.clientCat.attributes}/>
        </tbody>
      </BStable>
    </div>

  )
}

export default Table;