import './App.css';
import { StrictMode } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
