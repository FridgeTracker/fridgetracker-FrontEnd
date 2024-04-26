import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './styles/create.css';

import closeFridge from './assets/closeFridge.png';
import logo from './assets/ftlogo.png';
import { registerUserRequest } from './Requests/postRequests';

function CreateUser(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);

        const formData= {
          familyName: form.get("familyName"),
          email: form.get("email"),
          password: form.get("password"),
          rank: 0,
          imageData:''
        };

        setLoading(true);
        setMessage(await registerUserRequest(formData));
        setLoading(false);
    };

      return(
        <div className='registerWrapper'>
          <img src={logo} alt="logo" id="logo" onClick={() => {navigate("/")}}/>

          <div className='fridgeWrapper'>
            <img src={closeFridge} alt='wow'/>
          </div>

          <div className='rightSideSection'>
            <div className='formContainers'>
              <span className='formTitles'>
                <p>Welcome!</p>
                <p><strong>Register a new Account</strong></p>
              </span>

              <form className='formWrappers' onSubmit={handleSubmit}>
                <div className='inputWrappers'>
                    <input className='familyName' type="text" name="familyName" placeholder="Enter Family Name Here" required />
                    <input className='emailInput' type="text" name="email" placeholder="Enter Email Here" required />
                    <input className='passInput' type="password" name="password" placeholder="Enter Password Here" required />
                    <input className='passInput' type="password" name="password" placeholder="Re-Enter Password Here" required />
                </div>
   
                <div className='buttonWrappers'>
                  <button type="submit">{loading ? 'Creating User...' : 'Register'}</button>
                </div>
              </form>
            
              <span className='errorMessage'>
                <p>{message}</p>
              </span>

            </div>
          </div>
        </div>
      )
    };
    
    export default CreateUser;