import React, {useEffect, useState} from 'react'
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';

import Table from '../components/Table/Table';
import PageHead from './PageHead';

import firebase from 'firebase';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import TableEdit from '../components/Table/TableEdit';

const sel: string | undefined = undefined;

const DisplayTables: React.FC = () => {

  const [newCategory, setNewCategory] = useState('');
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');
  let regex = new RegExp(search.toLowerCase());

  const user = firebase.auth().currentUser;
  const uid = user === null ? '' : user.uid;
  const ref = firebase.database().ref(uid + '/categories');

  const handleNewCategory = () => {

    if(newCategory.length > 0) {
      ref.child(newCategory).set({
        attributes: {
          name: {
            type: 'text',
            priority: 1
          },
          quantity: {
            type: 'number',
            priority: 2
          }
        }
      });
    }

  }

  useEffect( () => {}, [search])

  const handleDelete = (str: string) => {
    console.log(str);
    let prompt = window.prompt(`Are you sure you want to delete ${str}? This process cannot be undone.\nPlease type in ${str} in the text field to confirm deletion.`);
    if(prompt === str){
      ref.update({[str]: null});
    }
  }   

  const clearSelect = () => {
    setSelect('');
  }

  const handleSearch = (str: string) => {
    setSearch(str.replace(/[^\w]/, ''));
  }



  if(select !== '') {

    return(
      <TableEdit uid={uid} category={select} clearSelect={clearSelect} />
    )

  } else {

    return(
      <div
      id='table-page'>
  

        <PageHead
          newCategory={newCategory}
          handleNewCategory= {handleNewCategory}
          setNewCategory= {setNewCategory}
          handleSearch={handleSearch}
          search={search}
        />
        <br/>
  
      <FirebaseDatabaseNode key={search} path={uid + '/categories'}>
      {
        d => {
          console.log(d);
          const categories = d.value !== null ? d.value : {};
          const keys = Object.keys(categories);
  
          const jsx = keys.map( (e: string, i: number) => {
            let res = regex.exec(e.toLowerCase());
            if(res !== null) {
              console.log(res);

              return (
                <React.Fragment>
                  <Row className='table-label'>
                    <Col className=' text-center' lg='1'>
                      <Button 
                      className='margin-flat fa fa-trash' 
                      variant='danger'
                      onClick={() => handleDelete(e)}
                      />
                      <Button 
                      className="fa fa-pencil" 
                      variant='warning' 
                      onClick={() => setSelect(e)}
                      />
                    </Col>
  
                    <Col lg='11'>
                    <h3 key={'d'+i}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}
                    </h3>
                    </Col>
  
                  </Row>
                  
                  <Table key={i} uid={uid} category={e} />
                  <br />
                </React.Fragment>
              )

            } else {
              return null;
            }
            
          })
  
          
          return (
            <div className='categories-container'>
              {jsx}
            </div>
          )
        }
      }
      </FirebaseDatabaseNode>
  
  
      </div>
    )

  }
}

export default DisplayTables;