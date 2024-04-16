
import React, { useState } from 'react';

function SecuritySettings() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('The New Password does not match.');
            return;
        }
        try {

        } catch (error) {
            setError('Failed to change the password.');
            console.error(error);
        }
    };

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
            <input type="password" id="Current-Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
            <label>New Password:</label>
            <input type="password" id="New-Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  />
        </div>
        <div>
            <label>Confirm New Password:</label>
            <input type="password" id="Confirm-Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br></br>
            <button className="change-password-button" onClick={handlePasswordChange}>Change Password</button>
        <br></br>
        <hr></hr>
        <div className="notifications-settings">
            <h3>Notifications</h3>
            <p>Customize the type of alerts you will receive</p>
        <div className="notifications-grid">
            <label>
                <input type="checkbox" id="expiry-box"/>Food Item Expired
            </label>
            <label>
                <input type="checkbox" id="empty-box" />Fridge/Freezer Empty
            </label>
            <label>
                <input type="checkbox" id="Full-box" />Fridge/Freezer Full
            </label>
            <label>
                <input type="checkbox" id="newMeal-box"/>New meals possible
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
