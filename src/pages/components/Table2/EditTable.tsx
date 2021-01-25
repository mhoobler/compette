import React, {useState, useEffect} from 'react';
import {
  Table as BStable,
  Row,
  Col
} from 'react-bootstrap';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import EditHead from './EditHead';
import EditRow from './EditRow';
import AddOneRow from './AddOneRow';

import firebase from 'firebase';

type Props = {
  uid: string
  catName: string
}

//Had weird mutation with 'editCat' inside TableContext
//Bringing ref.on() into here worked
//I'll  try to bring the listener back to TableContext later
const EditTable: React.FC<Props> = (P) => {

  console.log(P);
  const [clientCat, setClientCat] = useState<ClientCat | null>(null);

  const ref = firebase.database().ref(`${P.uid}/categories/${P.catName}`)

  useEffect( () => {
    ref.on('value' ,(snapshot) => {
      let val = snapshot.val();
      console.log(val);

      if(val){
        
        //get Category Attributes
        let attrs = Object.keys(val.attributes).map( attrName => {
          let cattr = val.attributes;
          // console.log(cattr);
          return {
            name: attrName,
            priority: cattr[attrName].priority,
            type: cattr[attrName].type,
            default: cattr[attrName].default
          }
        });

        //get Category Items
        let items = val.items ? Object.keys(val.items).map( itemKey => {
          let citem = val.items;
          return{
            ...citem[itemKey],
            key: itemKey
          }
        }) 
        : [];

        //return Categories as Array
        let cat = {
          name: P.catName,
          attributes: attrs,
          items: items
        };
        
        setClientCat(cat);
        
      }
    })
  }, [P.catName])

  return(
    
    <div>
      {clientCat !== null ?
      <div>
      <Row>
        <Col>
          
          <h3>
            <span>
              <EditButton
              clientCat={{...clientCat}}
              active={true}
              />
              <DeleteButton 
              type='category'
              value={[clientCat.name]}
              />
            </span>
            {clientCat.name}
          </h3>

        </Col>
      </Row>

      <BStable  striped bordered hover size="sm" variant='dark' responsive='md' >
        <thead>
        <EditHead catName={clientCat.name} attributes={clientCat.attributes} />
        </thead>

        <tbody>
        {clientCat.items ?
          clientCat.items.map( (e: any) => {
            
            return (
              <EditRow 
              catName={clientCat.name}
              attrs={clientCat.attributes} 
              item={e} 
              key={e.key} 
              />
            )

          })
          :
          null
        }
        <AddOneRow catName={clientCat.name} attrs={clientCat.attributes}/>
        </tbody>
      </BStable>
      </div>
      : ''}
    </div>
  )
}

export default EditTable;