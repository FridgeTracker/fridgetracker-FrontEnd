import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import Dash from './Dash';
import Admin from './components/admin/Admin';
import CreateUser from './components/createUser';
import LoginUser from './components/loginUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Need to add A admin Dashboard
// Issue for Poh
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route index element={<LoginUser />} />
        <Route path ="dash" element = {<Dash/>} />
        <Route path ="admin" element = {<Admin/>} />
        <Route path ="register" element={<CreateUser />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

