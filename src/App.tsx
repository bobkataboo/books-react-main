import React from 'react'
import './App.scss';
import NavBar from './components/NavBar/NavBar'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';


function App() {
  return (
  <div className="App">
      <NavBar></NavBar>
    <Switch>
      <Route path='/login'>
          <Login></Login>
      </Route>
      <Route path='/'>
        {/* <Login></Login> */}
      </Route>
    </Switch>
</div>);
}

export default App;
