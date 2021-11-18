import React from 'react';
import './App.css';
import Navigation from './site/Navbar';
import Auth from './site/Auth'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
     <div className="stylehere">
     <Navigation/>
       <Auth/>
     </div>
    </div>
  );
}

export default App;
