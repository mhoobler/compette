import React from 'react';
import Button from 'react-bootstrap/Button';

import Cell from './Cell';

import firebase from 'firebase';
import { FirebaseDatabaseNode } from '@react-firebase/database';

type Props = {
  isAuthed: boolean
}

type data = {
  name: string
  depth: number
  value: Array<string> | string | number
  valueIsChild: boolean
}

const Rename: React.FC<Props> = (P) => {

  var user = firebase.auth().currentUser;
  const uid = user === null ? '' : user.uid;

  const handleRename = (value: string) => {

  }

  const getRecursiveKeys = (obj: any, num = 0) => {
    // console.log(obj)

    let arr: Array<data> = [];

    Object.keys(obj).map( (str: string) => {
      // console.log(typeof obj[str]);
      // arr.push({name: str, depth: num});
      if(typeof obj[str] === 'object'){

        arr.push({
          name: str, 
          depth: num, 
          value: Object.keys(obj[str]), 
          valueIsChild: true
        });
        for(let x of getRecursiveKeys(obj[str], num + 1)){ arr.push(x) };

      } else {

        arr.push({
          name: str,
          depth: num,
          value: obj[str],
          valueIsChild: false
        });

      }
    })

    return arr;
  }

  const recreateFromKey = (obj: any, key: string, changeTo: string) => {
    for( let item of Object.keys(obj) ){

      if(item === key){
        console.log({[changeTo]: obj})
      }

      else if(typeof obj[item] === 'object'){
        recreateFromKey(obj[item], key, changeTo);
      }

    }
  }

  return (
    <div>
      <FirebaseDatabaseNode
        path={uid}
      >
      { d => {
        const data = d.value !== null ? d.value : {};
        const keysArr = getRecursiveKeys(data);
        console.log(keysArr);

        return (
          <div className='tree-list'>

            {keysArr.map( (e: data) => {
              console.log(e);

              return  (
                <div className='row'>
                  <Cell 
                  name={e.name} 
                  depth={e.depth} 
                  value={e.value} 
                  valueIsChild={e.valueIsChild}
                  />

                  <Button
                  variant="primary"
                  >
                    +
                  </Button>
                </div>
                )
            })}

          </div>
        )

      }}
      </FirebaseDatabaseNode>
      
    </div>
  )
}

export default Rename;