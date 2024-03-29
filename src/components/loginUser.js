
import React, { useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/login.css';

import openFridge from './assets/openFridge2.png';
import logo from './assets/ftlogo.png';
import { authenticateUser } from './authService';

function LoginUser(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: '',
      password: ''
     });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
      };


    const loginInWithEmailAndPassword = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/login', formData);
          
          authenticateUser(response.data);
          
          navigate("../Dash")
          
      } catch (error) {
          console.error('Login failed:', error);
         
      }
        
    }

      return(

        <div className='loginWrapper'>
          
          <img src={logo} alt="logo" id="logo" onClick={() => {navigate("/")}}/>

          <div className='fridgeContainer'>
            <img src={openFridge} alt='wow'/>
            
          </div>

          <div className='rightSide'>
            <div className='formContainer'>
              <span className='formTitle'>
                <p>Welcome Back!</p>
                <p><strong>Sign in to your account</strong></p>
              </span>
              
              <form onSubmit={loginInWithEmailAndPassword} className='formWrapper'>

                <div className='inputWrapper'>
                  <input className='emailInput' type="email" name="email" placeholder="Enter Email Here" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <br></br>

                  <input className='passInput' type="password" name="password" placeholder="Enter Password Here"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <span className='forgotButton'><p> Forgot Password? </p></span>
                
                <div className='buttonWrapper'>
                  <button type="submit" id='signIn'>Sign In</button>
                  <button id='signUp' onClick={() => navigate("../Register")}>Sign Up</button>
                </div>
          
              </form>

            </div>
          </div>
          

          
        </div>
      )
    };
    
    export default LoginUser;