
import React, { useState } from 'react';
import axios from 'axios';



function SecuritySettings() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('The New Password does not match.');
            return;
        }
        try {
            const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/change-password', {
                currentPassword,
                newPassword
            });
            console.log(response);
            setMessage(response.data);
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

        <form onSubmit={handlePasswordChange}>
            <div className="security-password">
                <h3>Password</h3>
                <p>Change your password</p>
            </div>
            <br></br>
            <div>Current Password: <input type="password" id="Current-Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></div>
            <div>New Password: <input type="password"  id="New-Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
            <div>Confirm New Password: <input type="password"  id="Confirm-Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br></br>
            <button type="submit" className="change-password-button">Change Password</button>
        </form>
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
