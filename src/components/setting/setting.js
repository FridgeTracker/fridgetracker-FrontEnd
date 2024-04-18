
import AccountSettings from './accountsettings';
import SecuritySettings from './securitysettings';
// import axios from 'axios';
import "./setting.css";

function Settings({userData}) {


    return (
        <div className="settings">
            <div className="settings-header">
                <h1>Settings</h1>
            </div>
            <div className="settings-container">
                <AccountSettings userData={userData}/>
                <SecuritySettings />                
            </div>
        </div>

    );
}
export default Settings;

    




                   