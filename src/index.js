import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dash from './Dash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Need to add A admin Dashboard
// Issue for Poh
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path ="dash" element = {<Dash/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

