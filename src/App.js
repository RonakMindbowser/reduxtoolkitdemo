import './App.css';
import { StrictMode } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
