
import React, { useState } from 'react';
import userIcon from "../assets/memberIcons/memberIcon.png";
import { getAuthToken } from '../authService.js';

import UploadWidget from './UploadWidget.js';
import { updateUserRequest } from '../Requests/postRequests.js';

function AccountSettings({userData,timeZoneOptions,updateUser}) {

    const [imgURL, setURL] = useState(userData.imageData);

    const [selectedTimeZone,setSelectedTimeZone] = useState(userData.timezone);
    const [message, setMessage] = useState("");

    const handleUpdateInformation = async(event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        const newUserInfo = {
            id:getAuthToken(),
            familyName  :formData.get("familyName"),
            email       :formData.get("email"),
            password    :formData.get("password"),
            timezone    :selectedTimeZone
        };
     

        try {
            setMessage(await updateUserRequest(newUserInfo));
            updateUser();
        }
        catch (error) {
            console.error('Failed to update information:', error);
            setMessage("User failed to update");
        }
    };

    const updateProfile = async (imageURL) => {

        setURL(imageURL);
        const uploadImage = {
            id:getAuthToken(),
            imageData: imageURL
        };

        try {
            await updateUserRequest(uploadImage);
            updateUser();
        }
        catch (error) {
        console.error('Failed to update information:', error);
        }
    };
    
    const handleTimeZoneChange = async(event) => {
        setSelectedTimeZone(event.target.value);
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
            <select  name="timeZone" id="timeZone" value={selectedTimeZone} selected={selectedTimeZone} onChange= {handleTimeZoneChange}>
                {timeZoneOptions && timeZoneOptions.map((timeZone) =>(
                    <option value={timeZone}>{timeZone}</option>
                ))}
            </select>
                </div>
        <div>Password:<input type="password" name="password" id="Password"/></div>
        <br></br>
            <button id="update-button" >Update Information</button>
        </form>
        <span id="updateMessage">
            {message && message}
        </span>
        </div>
        
    );
}

export default AccountSettings;
