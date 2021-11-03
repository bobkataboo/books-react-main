import React from 'react';

import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Books from './components/Books/Books';
import Register from './components/Register/Register';

const SwitchWrapper = observer(() => (
  <>

    <NavBar />
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/books">
        <Books />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/">
        <Books />
      </Route>
    </Switch>
  </>
));

function App() {
  return (
    <div className="App">
      <SwitchWrapper />

    </div>
  );
}

export default App;
