import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './styles/create.css';

import closeFridge from './assets/closeFridge.png';
import logo from './assets/ftlogo.png';

function CreateUser(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const[formData, setFormData] = useState({
        familyName: '',
        email: '',
        password: '',
        rank: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [message, setMessage] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try{

            const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/register', formData);
            console.log(response);
            setMessage(response.data);

        }catch(error){

            setMessage(error.response.data);
            console.error('Registration failed', error);
        } finally {
          setLoading(false);
        }
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

                    <input className='familyName' type="text" name="familyName" placeholder="Enter Family Name Here" value={formData.familyName} onChange={handleChange} required />

                    <br></br>

                    <input className='emailInput' type="text" name="email" placeholder="Enter Email Here" value={formData.email} onChange={handleChange} required />

                    <br></br>

                    <input className='passInput' type="password" name="password" placeholder="Enter Password Here" value={formData.password} onChange={handleChange} required />

                    <br></br>

                    <input className='passInput' type="password" name="password" placeholder="Re-Enter Password Here" value={formData.password} onChange={handleChange} required />
                
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