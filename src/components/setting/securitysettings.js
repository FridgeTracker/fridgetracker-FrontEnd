
import React from 'react';

function SecuritySettings() {
    
    return (
        <div className="security-settings">
            <h4>Security Settings</h4>
            <p>Change Password and notifications</p>  

        <div className="security-password">
            <h4>Password</h4>
            <p>Change your password</p>
        </div>          
        <br></br>
        <div>
            <label>Current Password:</label><br></br>
            <input type="password" id="Current-Password" />
        </div>
        <div>
            <label>New Password:</label><br></br>
            <input type="password" id="New-Password" />
        </div>
        <div>
            <label>Confirm New Password:</label><br></br>
            <input type="password" id="Confirm-Password" />
        </div>
        <br></br>
            <button>Change Password</button>
        <br></br>
        <div className="notifications-settings">
            <h4>Notifications</h4>
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
            <button style={{ marginRight: '10px' }}>Discard</button>
            <button>Save</button>
        </div>
    </div>
</div>
    );
}

export default SecuritySettings;
