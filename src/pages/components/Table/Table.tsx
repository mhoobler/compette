import React, {useEffect, useState} from 'react';
import {
  Table as BSTable,
  Button,
  Form,
  Collapse,
  Row,
  Col,
  InputGroup
} from 'react-bootstrap' ;

import AddRow from './AddRow';
import Head from './TableHead';
import DisplayRow from './Row';

import firebase from 'firebase';

enum typeEnum {
  Text = 'text',
  Number = 'number'
};

type listType = {
  keys: string[]
  items: any
}

type attrType = {
  name: string
  type: typeEnum
  priority: number
}

const defaultList: listType = {
  keys: [],
  items: {}
}

const defaultAttr: attrType = {
  name: '',
  type: typeEnum.Text,
  priority: 3
}

const defaultAttributes: any = {};

const defaultSettings = {
  orderByChild: 'name',
  limitTo: 3,
  descending: false
}

type Props = {
  category: string
  uid: string
}

const Table: React.FC<Props> = (P) => {

  const [newEntry, setNewEntry] = useState({});
  const [newAttr, setNewAttr] = useState(defaultAttr);
  const [entriesList, setList] = useState(defaultList);
  const [attributes, setAttributes] = useState(defaultAttributes);

  const [open, setOpen] = useState(false);
  
  const path = P.uid + '/categories/' + P.category;
  const itemsRef = firebase.database().ref(path + '/items');
  const attrsRef = firebase.database().ref(path + '/attributes');

  useEffect( () => {
    itemsRef.on("value", (snapshot) => {
      const val = snapshot.val();
      var obj: any = {};

      obj.keys = val !== null ? Object.keys(val) : [];
      obj.items = val || {}

      if(obj !== entriesList) {setList(obj)};
      console.log(obj);
    });

    attrsRef.on("value", function(snapshot) {
      const val = snapshot.val();
      const names = val !== null ? Object.keys(val) : [];

      var prio = newAttr.priority;
      console.log(val);

      let obj: any = {};

      for(let x of names){
        obj[x] = '';
        prio = val[x].priority >= prio ?
               (val[x].priority + 1) : prio;
      }
      console.log(obj);

      //Give newEntry object structure
      //Same method is used for adding input values
      if(obj !== newEntry) {setNewEntry(obj)};
      if(Object.keys(obj) !== attributes) {setAttributes(val)};
      setNewAttr({...newAttr, priority: prio});
    });

  }, [P.category]);

  // DATABASE HANDLERS ?State should not change here?

  const handleSubmit = (cond: string) => {

    switch(cond){
      case('entry'): {
        itemsRef.push(newEntry);
        // handleUpdate(cond);
        break;
      }
      case('attribute'): {

        let obj = {
          priority: newAttr.priority,
          type: newAttr.type
        }

        console.log(newAttr);
        attrsRef.child(newAttr.name).set(obj);
        // handleUpdate(cond);
        break;
      }

      default: {
        // handleUpdate('');
      }
    }
  }

  const handleRemove = (elm: any) => {
    const items = firebase.database().ref(path + '/items');
    console.log(elm.value);

    items.child(elm.value).set({});
    // handleUpdate('');
  }

  // CLIENT HANDLERS

  const handleNewEntryChange = (str: string, attr: string) => {
    //Copy newEntry to get object structure
    let obj: any = newEntry;
    console.log({
      str: str,
      attr: attr
    })

    //Get attribute from input field
    //Get put input field value into obj attribute
    obj[attr] = str;
    console.log(obj);

    //Set State
    setNewEntry(obj);
  }

  const handleNewAttrChange = (obj: attrType) => {
    if(obj !== newAttr) {
      setNewAttr(obj);
    }
  }

  const handleEntryEdit = (obj: any, entryID: string) => {
    console.log(obj);
    if(obj !== entriesList.items[entryID]){
      // let newItems = entriesList.items;
      // newItems[entryID] = obj;

      // setList({
      //   ...entriesList,
      //   items: newItems
      // })

      itemsRef.child(entryID).set(obj);
    } else {
      console.log(false);
    }
  }

  //newAttr onChange is handled in the input element

  return (
    <div className='table-container'>
      <BSTable striped bordered hover size="sm" variant='dark'responsive='md' >

{/* Head */}

    <Head attributes={attributes}/>


      <tbody>
{/* Entrty Rows */}
      {entriesList.keys.length > 0 ? 
        entriesList.keys.map( (e: string, i: number) => {
          return (
            <DisplayRow
            key={i}
            datakey={e}
            value={entriesList.items[e]}
            attributes={attributes}
            handleEdit={handleEntryEdit}
            handleRemove={handleRemove}
            />
          )
        } )
        :
        null
      }

{/* Add new row */}

        <Collapse in={open}>
          <AddRow
          attributes={attributes} 
          category={P.category}
          newEntry={newEntry}
          handleChange={handleNewEntryChange} 
          handleSubmit={handleSubmit}
          />
        </Collapse>

      </tbody>

      </BSTable>

{/* Submit new row */}

      <Row>
        <Col xs='4' lg='1'>
          <Button
          variant='success'
          onClick={() => {
            handleSubmit('attribute');
          }}
          >
            Add Attribute
          </Button>
        </Col>
        <Col xs='8' lg='6'>
          <Row>
            <Col xs='12' lg='6'>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                type='text'
                value={newAttr.name}
                onChange={ (evt) => {
                  setNewAttr({
                    ...newAttr,
                    name: evt.currentTarget.value
                  });
                }}
                />
              </InputGroup>
            </Col>

          <Col xs='12' lg='6'>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as='select'
                onChange= { (evt) => {
                  const value = evt.currentTarget.value;
                  console.log(newAttr.type);
                  switch(value){
                    case('Text'):{
                      setNewAttr({
                        ...newAttr,
                        type: typeEnum.Text
                      })
                      break;
                    }
                    case('Number'):{
                      setNewAttr({
                        ...newAttr,
                        type: typeEnum.Number
                      })
                      break;
                    }
                  }
                }}
              >
                <option>Text</option>
                <option>Number</option>
              </Form.Control>
            </InputGroup>
          </Col>

          </Row>
        </Col>
      </Row>




    </div>
  )
}

export default Table;

