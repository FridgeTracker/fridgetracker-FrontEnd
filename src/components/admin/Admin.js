import React, { useEffect, useState } from 'react';

import logoutIcon from '../assets/logoutIcon.png';
import './Admin.css';
import {useNavigate } from 'react-router-dom';
import {logoutUser } from "../authService";

import AdminUser from './adminUser';
import { getUserRank, getUsers } from '../Requests/getRequest';


function Admin(){

    const[users,setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const checkUserRank = async () => {
          await getUserRank(navigate);
        };
      
        checkUserRank();
      }, [navigate]);


    useEffect(() => {
        async function retrieveUsers(){
            try{
                const response = await getUsers();
                setUsers(response);
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