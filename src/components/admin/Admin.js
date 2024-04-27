import React, { useEffect, useState } from 'react';

import logoutIcon from '../assets/logoutIcon.png';
import './Admin.css';
import {useNavigate } from 'react-router-dom';
import {getAuthToken, logoutUser } from "../authService";

import AdminUser from './adminUser';
import { getUserRank, getUsers } from '../Requests/getRequest';
import axios from 'axios';


function Admin(){

    const[users,setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const[messsage, setMessage] = useState("");
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
                console.error(error);
            }
        }
        retrieveUsers();
    },[])

    const handleChangeUserInfo = async (event) => {
        event.preventDefault();
        const clickedButtonName = document.activeElement.name;

        const formData = new FormData(event.target);
        const form = {
            id: selectedUser,
            password: formData.get("adminPassword"),
            ...(clickedButtonName === "updateUser" ? {
              newPw: formData.get("password"),
              email: formData.get('email'),
            } : {}),
            ...(clickedButtonName === "deleteUser" ? { rank: 3 } : {}),
          };

        try{
            const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/AdminChange/${getAuthToken()}`,form);
            setMessage(response.data);
            setUsers(await getUsers());
        } catch (error) {
            console.error(error);
        }

    }
    
    
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
                <section className='adminTerminalWrapper'>
                    <div className='adminTerminal'>
                        <div className='adminLeft'>
                            <p>Admin Alerts</p>

                        </div>
                        <div className='adminRight'>
                            <div className='userIDSelection'>
                                <label>Select User ID</label>
                                <select onChange={(event) => setSelectedUser(event.target.value)}>
                                    {users && users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='adminEdit'>

                                {selectedUser && (
                                <>
                                    <form className='userDetailsAdmin' onSubmit={handleChangeUserInfo}>
                                        <p>Change Users Password</p>
                                        <input type='text' name="password" placeholder='Enter new user password'></input>
                                        <p>Change Users Email</p>
                                        <input type='text' name="email" placeholder='Enter new user email'></input>
                                        <p>Admin Password</p>
                                        <input type='text' name="adminPassword" placeholder='Enter admin password'></input>
                                        <input type="submit" name="updateUser" id="changeButton" value="Change"/>
                                        <input type="submit" name="deleteUser" id="deleteButton" value="Delete User"/>
                                    </form>

                                    {messsage && messsage}
                                    
                                    </>
                                    )}

                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </div>
    )
}

export default Admin;