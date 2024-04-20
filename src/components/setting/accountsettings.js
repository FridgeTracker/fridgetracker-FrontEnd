
import React, { useState } from 'react';
import userIcon from "../assets/memberIcons/memberIcon.png";
import axios from 'axios';
import { getAuthToken } from '../authService.js';

import UploadWidget from './UploadWidget.js';
import 


function AccountSettings({userData,timeZoneOptions}) {

    const [imgURL, setURL] = useState(userData.imageData);
    const [selectedTimeZone,setSelectedTimeZone] = useState('');



    const handleUpdateInformation = async(event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        const newUserInfo = {
            id:getAuthToken(),
            familyName  :formData.get("familyName"),
            email       :formData.get("email"),
            password    :formData.get("password")
        };
     

        try {
            
            await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateUser', newUserInfo);
            
        }
        catch (error) {
        console.error('Failed to update information:', error);
            
        }
    };

    const updateProfile = async (imageURL) => {

        setURL(imageURL);

        const uploadImage = {
            id:getAuthToken(),
            imageData: imageURL
        };

        try {
            await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateUser', uploadImage);
        }
        catch (error) {
        console.error('Failed to update information:', error);
        }

    };
    
    const handleTimeZoneChange = async(event) => {
        setSelectedTimeZone(event.target.value);

        try {
            await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/timezone', setSelectedTimeZone);
        }catch (error) {
            console.error('Failed to update timezone', error);
            }
    }
    return (
        <div className="account-settings">
            <h3>Account Settings</h3>
            <p>Change email, username and profile picture</p>
            <hr></hr>

        <div className="profilepic">
            <h3>Profile Picture</h3> 
            {imgURL ? <img id="profile-image" src={imgURL} alt="profile"/> :
            <img id="profile-image" src={userIcon} alt="profile"/>}  
            <label htmlFor="profile-image-input"> Click &nbsp;
            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> <UploadWidget updateProfile={updateProfile}/> </span>
            &nbsp; to change Profile Picture</label>
          
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
        <div>Time Zone:
            <select  name="timeZone" id="timeZone" value={selectedTimeZone} onChange= {handleTimeZoneChange} />
            <option value="">Select Time Zone</option>
                        {timeZoneOptions && timeZoneOptions.map((timeZone) =>(
                            <option value={timeZone}>{timeZone}</option>
                        ))}</div>
        <div>Password:<input type="password" name="password" id="Password"/></div>
        <br></br>
            <button id="update-button" >Update Information</button>
        </form>
        </div>
        
    );
}

export default AccountSettings;
