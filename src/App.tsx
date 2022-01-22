/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';

import './App.scss';
import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { observer } from 'mobx-react';
// import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Books from './components/Books/Books';
import Register from './components/Register/Register';

const SwitchWrapper = observer(({ location, setDarkMode, darkMode }) => (
  <>

    <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
    {/* <AnimatePresence> */}
    <Switch location={location}>
      <Route path="/books/unread" render={() => <Books darkMode={darkMode} />} />
      <Route path="/books/favourite" render={() => <Books darkMode={darkMode} />} />
      <Route path="/books/finished" render={() => <Books darkMode={darkMode} />} />
      <Route path="/books/:bookId" render={({ match }) => <Books bookId={match.params.bookId} darkMode={darkMode} />} />
      <Route path="/books" render={() => <Books darkMode={darkMode} />} />
      <Route path="/login" render={() => <Login darkMode={darkMode} />} />
      <Route path="/register" render={() => <Register darkMode={darkMode} />} />
      <Route path="/" render={() => <Books darkMode={darkMode} />} />
    </Switch>
    {/* </AnimatePresence> */}

  </>
));

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  return (
    <main id="App" className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <div id="AppContainer" className="App">
        <SwitchWrapper darkMode={darkMode} setDarkMode={setDarkMode} location={location} />
      </div>
    </main>
  );
}

export default App;
