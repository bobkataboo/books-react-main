/* eslint-disable class-methods-use-this */
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
      <Route path="/books/unread" render={() => <Books />} />
      <Route path="/books/favourite" render={() => <Books />} />
      <Route path="/books/finished" render={() => <Books />} />
      <Route path="/books/:bookId" render={({ match }) => <Books bookId={match.params.bookId} />} />
      <Route path="/books" render={() => <Books />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/register" render={() => <Register />} />
      <Route path="/" render={() => <Books />} />
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
