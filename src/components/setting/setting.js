
import AccountSettings from './accountsettings';
import SecuritySettings from './securitysettings';
 
import "./setting.css";
import React, { useState } from "react";
import userIcon from "../assets/memberIcons/memberIcon.png";

function Settings({userData}) {

    return (
        <div className="settings">
            <div className="settings-header">
                <h1>Settings</h1>
            </div>
            <div className="settings-container">
                <AccountSettings />
                <SecuritySettings />
                
            </div>
        </div>
    );
}


export default Settings;

    




                   