import React from 'react'
import './App.scss';
import NavBar from './components/NavBar/NavBar'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Books from './components/Books/Books'


function App() {
  return (
  <div className="App">
      <NavBar></NavBar>
    <Switch>
      <Route path='/login'>
          <Login></Login>
      </Route>
      <Route path='/'>
       <Books/>
      </Route>
      <Route path="/books">
        <Books/>
      </Route>
    </Switch>
</div>);
}

export default App;
