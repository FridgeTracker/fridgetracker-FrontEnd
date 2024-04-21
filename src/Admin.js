import React, { useEffect, useState } from 'react';

import logoutIcon from './components/assets/logoutIcon.png';
import './Admin.css';
import {useNavigate } from 'react-router-dom';
import {logoutUser } from "./components/authService";

import AdminUser from './components/admin/adminUser';
import { getUser, getUsers } from './components/Requests/getRequest';


function Admin(){

    const[users,setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserRank = async () => {
          try {
            const user = await getUser();
            if (user.rank === 0 || user.rank === null) {
              navigate("/");
            }
          } catch (error) {
            console.error("Error checking user rank:", error);
            navigate("/");
          }
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