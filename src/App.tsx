import React, {useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login/Login';
import Nav from './pages/components/Nav/NavContainer';

import TimesPage from './pages/Times';
//Refactor
import Tables2Page from './pages/Tables2';
import TableProvider from './pages/Tables2/TableContext';
//Testing components


//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//firebase
import config from './config'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FirebaseAuthConsumer, FirebaseAuthProvider } from '@react-firebase/auth';
import { FirebaseDatabaseProvider } from '@react-firebase/database';


const App: React.FC = () => {

  const [isAuthed, setAuthed] = useState(false);

  return (
    <div className='App'>
      <Router>


          <Nav authed={isAuthed} />
          
          <Switch>
            <FirebaseAuthProvider firebase={firebase} {...config}>
            <FirebaseDatabaseProvider firebase={firebase} {...config}>
              {/* 
              Forgot exactly why I did the AuthConsumer this way 
              but it was a pain to do it the "proper way"
              might need to change in the future
              */}
              <FirebaseAuthConsumer>
                {
                  ({isSignedIn, firebase}) => {
                    if(isSignedIn === true) {
                      setAuthed(true);
                    } else {
                      setAuthed(false);
                    }
                  }
                }
              </FirebaseAuthConsumer>

            {/* Right now this is a feature in progress */}
            {/* <Route path='/testing'>
                <TableProvider>
                  <Tables2Page />
                </TableProvider>
            </Route> */}

            <Route path='/clock'>
              <TimesPage />
            </Route>

            {/* Landing Page */}
            <Route exact path='/'>
              { isAuthed ? <TableProvider><Tables2Page /></TableProvider> : <Login />}
            </Route>

            </FirebaseDatabaseProvider>
            </FirebaseAuthProvider> 
          </Switch>
      
      </Router>
    </div>
  );
}

export default App;


// return (
//   <FirebaseDatabaseProvider firebase={firebase} {...config}>
//   <div>
//     <FirebaseDatabaseNode
//       path={P.user.uid}
//       limitToFirst={0}
//       // orderByKey
//       orderByValue={"created_on"}
//     >
//       {d => {
//         console.log(d);
//         return (
//           <React.Fragment>
//             <pre>Path {d.path}</pre>
//             <pre style={{ height: 300, overflow: "auto" }}>
//               Value {JSON.stringify(d.value)}
//             </pre>
            
//           </React.Fragment>
//         );
//       }}
//     </FirebaseDatabaseNode>
//   </div>
// </FirebaseDatabaseProvider>
// )