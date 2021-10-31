import React, { useEffect, useMemo } from 'react'
import './App.scss';
import NavBar from './components/NavBar/NavBar'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Books from './components/Books/Books'
import UserStore from './Stores/UserStore';
import { observer } from 'mobx-react';
import Register from './components/Register/Register';


function App() {
  return (
  <div className="App">
     <SwitchWrapper></SwitchWrapper>

</div>);
}

const SwitchWrapper = observer(() => {

  return <>

 <NavBar></NavBar>
  <Switch>
  <Route path='/login'>
      <Login ></Login>
  </Route>
  <Route path="/books">
    <Books/>
  </Route>
  <Route path="/register">
    <Register/>
  </Route>
  <Route path='/'>
   <Books/>
  </Route>
</Switch>
</>

})

export default App;
