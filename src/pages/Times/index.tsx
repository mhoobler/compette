import React, {useState, useEffect} from 'react';

import TimeDisplay from '../components/Clock/TimeDisplay';
import EventsController from '../components/Clock/EventsController';
import TimesTable from '../components/Clock/TimesTable';

import firebase from 'firebase';

const dummyArr = ['Work', 'Play']

const Clock: React.FC = () => {

  const [timeData, setTimeData] = useState({});

  const user = firebase.auth().currentUser;
  const uid = user === null ? '' : user.uid;
  const clockRef = firebase.database().ref(uid + '/clocks');

  useEffect( () => {
    clockRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      const val = snapshot.val() !== null ? snapshot.val() : {};
      console.log(val);
      setTimeData(val);
    })
  }, [])

  const handleSubmit = (str: string) => {
    let date = new Date();
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    let ymd = `${y}/${m}/${d}`;
    console.log(ymd);

    let milli = date.getTime().toString();
    clockRef.child(ymd).update({
      [milli]: str
    });

    return true;
  }
  
  return(
    <div>
      <TimeDisplay />
      <EventsController events={dummyArr} handleSubmit={handleSubmit} />
      <TimesTable timeData={timeData}/>
    </div>
  )
}

export default Clock;