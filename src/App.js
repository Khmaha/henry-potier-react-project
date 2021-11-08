import React from 'react'
import './App.scss';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import GetRoutes from './routes/index';

function App() {
  return (
    <div className="App">
        <HeaderComponent />
        <GetRoutes></GetRoutes>
    </div>
  );
}

export default App;
