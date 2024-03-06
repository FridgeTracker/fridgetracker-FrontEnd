
import React, { useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/loginUser.css';

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
          console.log(response.data); 
          localStorage.setItem('userEmail', formData.email);
          navigate("../Dash")
          
      } catch (error) {
          console.error('Login failed:', error);
         
      }

        
        
    }

      return(
        <div className='loginWrapper'>
          <form onSubmit={loginInWithEmailAndPassword} className='formWrapper'>
            <p>E-mail</p>
            <input
              className='emailInput'
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br></br>
            <p>Password</p>
            <input
              className='passInput'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br></br>
            <div className='buttonWrapper'>
              <button type="submit">Login</button>
             </div>
          </form>
        </div>
      )
    };
    
    export default LoginUser;