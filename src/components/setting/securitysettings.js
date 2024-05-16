import React, { useState } from 'react';
import { getAuthToken } from '../authService.js';
import { changePasswordRequest, updateNotificationsRequest } from '../Requests/postRequests.js';

function SecuritySettings({user, updateUser}) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [userAlerts, setUserAlerts] = useState({
        id:user.id,
        expiryDate: user.expiryDate,
        storageEmpty: user.storageEmpty,
        storageFull: user.storageFull
      });
    
      const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setUserAlerts(prevUserAlerts => ({
          ...prevUserAlerts,
          [id]: checked
        }));
      };

      const handleDiscard = () => {
        setUserAlerts({
          expiryDate: user.expiryDate,
          storageEmpty: user.storageEmpty,
          storageFull: user.storageFull
        });
      };

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        if (formData.get("CNP")===formData.get("NP")){
            const newPasswordInfo = {
                id: getAuthToken(),
                password: formData.get("CP"),
                newPw: formData.get("CNP") 
            };

            try {
                setError(await changePasswordRequest(newPasswordInfo));
            } 
            catch (error) {
                setError(error);
            }

        }
        else{
            setError('Password do not match.');
        }
    };


    const updateNotifications = async () => {
        try{
            setMessage(await updateNotificationsRequest(userAlerts));
            updateUser();
        } catch(error){
            console.error(error);
        }
    }

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
                        <input type="checkbox" id="expiryDate" onChange={handleCheckboxChange} checked={userAlerts.expiryDate}/>Food Item Expired
                    </label>
                    <label>
                        <input type="checkbox" id="storageEmpty" onChange={handleCheckboxChange} checked={userAlerts.storageEmpty}/>Fridge/Freezer Empty
                    </label>
                    <label>
                        <input type="checkbox" id="storageFull" onChange={handleCheckboxChange} checked={userAlerts.storageFull}/>Fridge/Freezer Full
                    </label>
                    
                </div>
                <div>
                    <button id="Discard-button" onClick={() => handleDiscard()}>Discard</button>
                    
                    <button id="save-button" onClick={() => updateNotifications()}>Save</button>
                </div>
                <span id="notiMessage">{message && message}</span>
            </div>
        </div>
    );
}

export default SecuritySettings;
