import React, {useState} from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';

type Props = {
  timeData: any
}

const testObj = {
  2021: {
    1:{
      12: {
        123: 'test'
      },
      13: {
        123: 'test'
      },
      14: {
        123: 'test'
      },
    },
    2:{
      12: {
        123: 'test'
      },
      13: {
        123: 'test'
      },
      14: {
        123: 'test'
      },
    }
  },
  2022: {
    1:{
      12: {
        123: 'test'
      },
      13: {
        123: 'test'
      },
      14: {
        123: 'test'
      },
    },
    2:{
      12: {
        123: 'test'
      },
      13: {
        123: 'test'
      },
      14: {
        123: 'test'
      },
    }
  }
}

const TimesTable: React.FC<Props> = (P) => {

  const [from, setFrom] = useState('');

  let keys = Object.keys(P.timeData);
  // console.log(asdf);

  //Refactor this mess
  const getRecursiveValues = () => {
    var rows: any[] = [];

    let getChildren = (obj: any, array: string[] = []) => {
      let keys = Object.keys(obj);
      
      //Map is returning empty arrays or something
      //Headhurts and kinda forgot what the problem was
      //This works for now though
      keys.map( (k: string) => {
        if(typeof obj[k] === 'object'){
          let arr = [...array];
          arr.push(k);
          getChildren(obj[k], arr);
        } else {
          array.push(k);
          array.push(obj[k]);
          rows.push(array);
          return array;
        }
      })

    }

    getChildren(testObj);
    return rows;
  }

  const handleTest = (test: any) => {
    console.log(test);
  }

  const asdf = getRecursiveValues();
  console.log(asdf)

  return(
    <div>
      <Form.Control type='date' defaultValue={'2021-01-21'} onChange={(evt) => handleTest(evt.target.value) }/>
      {/* TimesTable */}
      <Button onClick={getRecursiveValues}>Test</Button>
      { keys.map( (e:string, i:number) => {
        let date = new Date(parseInt(e));
        return date.toLocaleString();
      })}
    </div>
  )
}

export default TimesTable;