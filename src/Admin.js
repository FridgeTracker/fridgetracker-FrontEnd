import React, { useEffect, useState } from 'react';

import logoutIcon from './components/assets/logoutIcon.png';
import './Admin.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {logoutUser } from "./components/authService";

import AdminUser from './components/admin/adminUser';



function Admin(){

    const[users,setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        async function retrieveUsers(){
            try{
                const response = await axios.get("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getUsers");
                setUsers(response.data);
                console.log(response.data);
            } catch(error){
                console.log(error);
            }
        }
        retrieveUsers();

    },[])
    
    return(
        <div className='admin'>
            <section className='userContainer'>
                <section className='adminTopWrapper'>
                    <div className='logoutButton'>
                        <img src={logoutIcon} alt="logout" onClick={() => {logoutUser();navigate("/");}}/>
                    </div>
                </section>

                <section className='userContent'>
                    {users && users.map((user) => {
                        return <>
                           <AdminUser user={user}/>
                        </>
                    })}
                </section>
            </section>
        </div>
    )
}

export default Admin;