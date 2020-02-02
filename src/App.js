import React from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar'

function App() {
  
  return (
    <div className="wrapper">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;