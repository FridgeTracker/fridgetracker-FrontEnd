import React, { useEffect, useState } from 'react';

import logoutIcon from '../assets/logoutIcon.png';
import './Admin.css';
import {useNavigate } from 'react-router-dom';
import {getAuthToken, logoutUser } from "../authService";

import AdminUser from './adminUser';
import { getUser, getUserRank, getUsers } from '../Requests/getRequest';
import axios from 'axios';


function Admin(){

    const[users,setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const[messsage, setMessage] = useState("");
    const[admin, setadmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const checkUserRank = async () => {
          await getUserRank(navigate);
        };

        const settingAdmin = async () => {
            setadmin(await getUser());
        }
      
        settingAdmin();
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
        const clickedButton = event.nativeEvent.submitter;
        const clickedButtonName = clickedButton.name;

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
                            <h3>Admin Alerts</h3>
                            <table className="notificationTable">
                            <thead>
                                <tr>
                                    <th className="tableHeader">Sender</th>
                                    <th className="tableHeader">Email</th>
                                    <th className="tableHeader">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admin && admin.notification.map((noti, index) => (
                                    <tr key={index} className="notiMessage">
                                        <td>{noti.sender}</td>
                                        <td>{noti.message}</td>
                                        <td>{noti.alert_type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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