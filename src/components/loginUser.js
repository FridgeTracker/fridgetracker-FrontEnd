
import React, { useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import './styles/login.css';

import openFridge from './assets/openedFridge.png';
import logo from './assets/ftlogo.png';
import { getUserRank } from './Requests/getRequest';
import { loginUserRequest } from './Requests/postRequests';
import axios from 'axios';

function LoginUser(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [forget, setforget] = useState(false);
    const[errorMessagge, seterrorMessagge] = useState("");
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

        await loginUserRequest(formData,navigate,setLoading,seterrorMessagge);
    }

    const forgotPassword = async(e)=>{
      e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get("email");
       
        try {
          const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/forgetPassword/${email}`);
          console.log(response.data);
          setforget(false);
        } catch(error){
          console.error(error);
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
                {!forget && <p><strong>Sign in to your account</strong></p>}
                {forget && <p><strong>Please enter your email below.</strong></p>}
              </span>
              
              <form onSubmit={forget?forgotPassword:loginInWithEmailAndPassword} className='formWrapper'>

                <div className='inputWrapper'>
                  <input className='emailInput' type="email" name="email" placeholder="Enter Email Here" required/>
                  {!forget && <input className='passInput' type="password" name="password" placeholder="Enter Password Here" required/>}
                </div>

                {!forget && <span className='forgotButton' onClick={() => {setforget(true); seterrorMessagge("")}}><p> Forgot Password? </p></span>}
                
                <div className='buttonWrapper'>
                  {forget &&
                    <>
                    <button type="submit" name="forgetSubmit" id='forget password'>Submit</button>
                    <button id='Back' onClick={() => setforget(false)}>Back to login</button>
                    </>
                  }
                  {!forget &&
                    <>
                    <button type="submit" id='signIn'>{loading ? 'Signing In...' : 'Sign In'}</button>
                    <button id='signUp' onClick={() => navigate("../Register")}>Sign Up</button>
                  </>}
                  
                </div>
          
              </form>
              
            </div>
            <p className='erroMessageLogin'>{errorMessagge && errorMessagge}</p>
          </div>
          
        </div>
      )
    };
    
    export default LoginUser;