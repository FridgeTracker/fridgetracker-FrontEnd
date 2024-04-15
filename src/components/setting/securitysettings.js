
import React from 'react';

function SecuritySettings() {
    
    return (
        <div className="security-settings">
            <h3>Security Settings</h3>
            <p>Change Password and notifications</p>  
            <hr></hr>

        <div className="security-password">
            <h3>Password</h3>
            <p>Change your password</p>
        </div>          
        <br></br>
        <div>
            <label>Current Password:</label>
            <input type="password" id="Current-Password" />
        </div>
        <div>
            <label>New Password:</label>
            <input type="password" id="New-Password" />
        </div>
        <div>
            <label>Confirm New Password:</label>
            <input type="password" id="Confirm-Password" />
        </div>
        <br></br>
            <button className="change-password-button">Change Password</button>
        <br></br>
        <hr></hr>
        <div className="notifications-settings">
            <h3>Notifications</h3>
            <p>Customize the type of alerts you will receive</p>
        <div className="notifications-grid">
            <label>
                <input type="checkbox" />Food Item Expired
            </label>
            <label>
                <input type="checkbox" />Fridge/Freezer Empty
            </label>
            <label>
                <input type="checkbox" />Fridge/Freezer Full
            </label>
            <label>
                <input type="checkbox" />New meals possible
            </label>
        </div>
        <div>
            <button id="Discard-button">Discard</button>
            
            <button id="save-button">Save</button>
        </div>
    </div>
</div>
    );
}

export default SecuritySettings;
