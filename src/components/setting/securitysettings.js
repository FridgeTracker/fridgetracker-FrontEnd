import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../authService.js';

function SecuritySettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        if (formData.get("CNP")==formData.get("NP")){
            const newPasswordInfo = {
                id: getAuthToken(),
                password: formData.get("CP"),
                newPw: formData.get("CNP") 
            };
            console.log(newPasswordInfo);

            try {
                await axios.post('https://localhost:9090/api/changePw', newPasswordInfo);
            } catch (error) {
                console.error('Failed to update Password:', error);
                setError('Failed to update Password');
            }
    }else{
        setError('Password do not match.');
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
                <div>Current Password: <input type="password" id="Current-Password" name="CP" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></div>
                <div>New Password: <input type="password"  id="New-Password" name="NP" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                <div>Confirm New Password: <input type="password"  id="Confirm-Password" name="CNP" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /></div>
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
