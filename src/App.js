import './App.css';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './screens/Counter';

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Counter />} index />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
