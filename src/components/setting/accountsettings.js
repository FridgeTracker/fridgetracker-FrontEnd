
import React from 'react';

function AccountSettings() {
    return (
        <div className="account-settings">
            <h4>Account Settings</h4>
            <p>Change email, username and profile picture</p>

        <div className="profilepic">
            <h4>Profile Picture</h4>
            <p>Click here to change Profile Picture</p>
        </div>
      
        <div className="change-personalInfo">
            <h4>Change Personal Information</h4>
            <p>Update your family name. Edit your email address.</p>
            <p>Click on update information when changes are complete</p>
        </div>
        <br></br><br></br>
        <div>
            <label>Family Name:</label><br></br>
            <input type="text" id="family-name" />
        </div>
        <div>
            <label>Email Address:</label><br></br>
            <input type="email" id="email" />
        </div>
        <div>
            <label>Location:</label><br></br>
            <input type="text" id="location" />
        </div>
        <div>
            <label>Password:</label><br></br>
            <input type="password" id="Password" />
        </div>
        <br></br>
            <button>Update Information</button>
        </div>
    );
}

export default AccountSettings;
