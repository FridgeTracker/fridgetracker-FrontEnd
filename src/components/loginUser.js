
import React, { useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import './styles/login.css';

import openFridge from './assets/openedFridge.png';
import logo from './assets/ftlogo.png';
import { getUserRank } from './Requests/getRequest';
import { loginUserRequest } from './Requests/postRequests';

function LoginUser(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // If User didnt logout token stays stored and relog automatically
    useEffect(() => {
      const redirectUser = async () => {
        await getUserRank(navigate);
      };
      redirectUser();
    }, [navigate]);
    

    const loginInWithEmailAndPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target);
        const formData = {
          email: form.get("email"),
          password: form.get("password")
         };

        await loginUserRequest(formData,navigate,setLoading);
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
                    required
                  />

                  <br></br>

                  <input className='passInput' type="password" name="password" placeholder="Enter Password Here"
                    required
                  />
                </div>

                <span className='forgotButton'><p> Forgot Password? </p></span>
                
                <div className='buttonWrapper'>
                  <button type="submit" id='signIn'>{loading ? 'Signing In...' : 'Sign In'}</button>
                  <button id='signUp' onClick={() => navigate("../Register")}>Sign Up</button>
                </div>
          
              </form>
            </div>
          </div>
        </div>
      )
    };
    
    export default LoginUser;