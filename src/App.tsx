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
import BookDetails from './components/Books/BookDetails';

const SwitchWrapper = observer(() => (
  <>

    <NavBar />
    <Switch>
      <Route path="/books">
        <Books />
      </Route>
      <Route path="/books/unread">
        <Books />
      </Route>
      <Route path="/books/favourite">
        <Books />
      </Route>
      <Route path="/books/finished">
        <Books />
      </Route>
      <Route path="/books/:bookId" render={(props) => <BookDetails bookId={props.match.params.bookId} />} />
      <Route path="/login">
        <Login />
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
