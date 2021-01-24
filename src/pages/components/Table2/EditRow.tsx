import React, {useState, useRef} from 'react';
import {Button, Form} from 'react-bootstrap';

import firebase from 'firebase';

type Props = {
  catName: string
  attrs: ClientAttr[]
  item: any
}

const EditRow: React.FC<Props> = (P) => {

  const [item, setItem] = useState(P.item);
  const [double, setDouble] = useState(false);
  const timerRef = useRef<any>(null);

  let isSame = () => { return P.item === item };

  let sorted = [...P.attrs].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  const setTimer = () => {
    timerRef.current = 
    setTimeout( () => {
      setDouble(false);
    }, 750)
  }

  // useEffect( () => {
  //   setItem(P.item);
  // }, [item])

  const handleSubmit = () => {
    const uid = firebase.auth().currentUser?.uid;
    const ref = uid ? firebase.database()
      .ref(`${uid}/categories/${P.catName}/items`)
      : false;
    
    if(ref){
      let update = {...item};
      delete update.key;
      // console.log(update);
      // console.log(item);
      ref.child(item.key).update(update,
        (err) => { if(err){console.log(err)} });
    }
  }

  const handleInput = (value: string, attr: string) => {
    setItem({
      ...item,
      [attr]: value
    })
  }

  const reset = () => {
    if(double){
      setItem(P.item)
    }
  }

  return (
    <tr>
      <td>
        <Button 
        className={isSame() ? 'fa fa-check' : 'fa fa-plus'}
        variant='success'
        onClick={handleSubmit}
        disabled={isSame()}
        />
        <Button
        className='fa fa-undo'
        variant={double ? 'super-danger' : 'danger'}
        onClick={() => {
          reset();
          setDouble(true);
          setTimer();
        }}
        disabled={isSame()}
        />
      </td>
      {sorted.map( (e: ClientAttr, i: number) => {
        return (
          <td key={i}>
            <Form.Control
            type={e.type}
            defaultValue={item[e.name]}
            value={item[e.name]}
            onChange={(evt) => {
              let {value} = evt.currentTarget;
              handleInput(value, e.name);
            }}
            />
          </td>
        )
      })}
    </tr>
  )
}

export default EditRow;