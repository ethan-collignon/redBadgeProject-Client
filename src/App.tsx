import React from 'react';
import './App.css';
import Navigation from './site/Navbar';
import Auth from './site/Auth'
// import { setupMaster } from 'cluster';
import AppInfo from './site/AppInfo'


const App: React.FunctionComponent = () => {

  return (
    <div className="App">
     <div className="stylehere">
    <AppInfo/>
     </div>
    </div>
  );

  // updateLocalStorage = () => {

  // }
}

export default App;
