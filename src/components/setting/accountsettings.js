
import React from 'react';
import userIcon from "../assets/memberIcons/memberIcon.png";

function AccountSettings() {
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
        <div>
            <label>Family Name:</label>
            <input type="text" id="family-name" />
        </div>
        <div>
            <label>Email Address:</label>
            <input type="email" id="email" />
        </div>
        <div>
            <label>Location:</label>
            <input type="text" id="location" />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" id="Password" />
        </div>
        <br></br>
            <button id="update-button">Update Information</button>
        </div>
    );
}

export default AccountSettings;
