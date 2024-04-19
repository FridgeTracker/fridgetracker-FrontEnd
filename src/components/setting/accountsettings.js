
import React, { useState } from 'react';
import userIcon from "../assets/memberIcons/memberIcon.png";
import axios from 'axios';
import { getAuthToken } from '../authService.js';

function AccountSettings({userData}) {
    const [message, setMessage] = useState("");
    console.log(userData);

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

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        const maxMB = 0.5;

        if(file && file.size > maxMB * 1024 * 1024){
            console.log(file.size);
            document.getElementById("profile-image-input").value = "";
            setMessage("Image to large");

        } else{
            setMessage("");
            reader.onloadend = () => {
                saveImage(reader.result);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };

    const saveImage = async (profileData) => {

        const base64Parts = profileData.split(",");
        const base64Data = base64Parts[1];

        const imageUpload = {
            id:getAuthToken(),
            imageData: base64Data
        };

        try{

            await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateUser', imageUpload);
            
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="account-settings">
            <h3>Account Settings</h3>
            <p>Change email, username and profile picture</p>
            <hr></hr>

        <div className="profilepic">
            <h3>Profile Picture</h3>
            {userData.imageData ? (<img src={`data:image/png;base64,${userData.imageData}`} alt="User Icon" id="profile-image" />) :
            (<img src={userIcon} alt="User Icon" id="profile-image" />)
            }
            <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} id="profile-image-input"/>
            <label htmlFor="profile-image-input"> Click &nbsp;
            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> here </span>
            &nbsp; to change Profile Picture</label>
            {message && message}
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
