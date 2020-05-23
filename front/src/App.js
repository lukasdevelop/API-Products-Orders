import React from 'react';
import logo from './logo.svg';
import Header from './pages/Header'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'

function App() {
  return (
    <>
    <Header />
    <Routes />
    </>
  );
}

export default App;
