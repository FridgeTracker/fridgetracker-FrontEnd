import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './styles/create.css';
import logo from './assets/fridgeLogo.png';
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
          <div className='loginContainer'>
            <div className='leftSideFore'>
              <img src={logo} alt="logo" id="logo" onClick={() => {navigate("/")}}/>
            </div>
            <div className='rightSideSection'>
              <div className='formContainers'>
                <span className='formTitles'>
                  <p>Welcome!</p>
                  <p><strong>Register a new Account</strong></p>
                </span>

                <form className='formWrappers' onSubmit={handleSubmit}>
                  <div className='inputWrappers'>
                      <label>Family Name</label>
                      <input className='familyName' type="text" name="familyName" placeholder="Enter Family Name Here" required />
                      <label>Email</label>
                      <input className='emailInput' type="text" name="email" placeholder="Enter Email Here" required />
                      <label>Password</label>
                      <input className='passInput' type="password" name="password" placeholder="Enter Password Here" required />
                      <label>Repeat Password</label>
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
        </div>
      )
    };
    
    export default CreateUser;