
import React from 'react';
import userIcon from "../assets/memberIcons/memberIcon.png";
import { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../authService.js';

function AccountSettings({userData}) {
    
    const [familyName, setFamilyName] = useState(userData.familyName);
    const [email, setEmail] = useState(userData.email);
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
   

    const handleUpdateInformation = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        
        const newUserInfo = {
            id:getAuthToken(),
            familyName  :formData.get("familyName"),
            email       :formData.get("email"),
            password    :formData.get("password")
        };
        console.log(newUserInfo);
     

        try {
            
            await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateUser', newUserInfo);
           
            
            
        }
        catch (error) {
        console.error('Failed to update information:', error);
            
        }
    };
    
    return (
        <div className="account-settings">
            <h3>Account Settings</h3>
            <p>Change email, username and profile picture</p>
            <hr></hr>

        <div className="profilepic">
            <h3>Profile Picture</h3>
            <img src={userIcon} alt="User Icon" id="profile-image"/>
            <p>Click here to change Profile Picture</p>
            <hr></hr>
        </div>
      
        <div className="change-personalInfo">
            <h3>Change Personal Information</h3>
            <p>Update your family name. Edit your email address.</p>
            <p>Click on update information when changes are complete</p>
        </div>
        <br></br>
        <form onSubmit={handleUpdateInformation}>
        <div>Family Name:<input type="text" name="familyName" id="family-name" placeholder={userData.familyName}/></div>
        <div>Email Address:<input type="email" name="email" id="email" placeholder={userData.email} /></div>
        <div>Location:<input type="text" name="location" id="location"  /></div>
        <div>Password:<input type="password" name="password" id="Password"/></div>
        <br></br>
            <button id="update-button" >Update Information</button>
        </form>
        </div>
        
    );
}

export default AccountSettings;
