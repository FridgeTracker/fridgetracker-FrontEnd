import React, { useState } from 'react';
import axios from 'axios';
import './styles/createUser.css';

function CreateUser(){

    const[formData, setFormData] = useState({
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

        axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/register', formData)
            .then(response => {

                setMessage('Registration successful');

            })
            .catch(error => {
                console.error('Registration failed', error);

            });
    };

    return (
        <div className='createWrapper'>

            <div className='progressTracker'>
                <div className='progressContent'>
                    <div><p>Create User</p></div>
                    <div><p>Add Info</p></div>
                    <div><p>Confirm</p></div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='leftWrapper'>
                    <li>
                        <p>Enter Email</p>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <p>Enter password</p>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                       
                    </li>
                </div>
            
                <div className='rightWrapper'>
                    <p>{message}</p>
                    <button type="submit">Sign Up</button>
                </div>
            
            </form>
            
        </div>
    )   
}

export default CreateUser;