
import { useEffect, useState } from 'react';
import AccountSettings from './accountsettings';
import SecuritySettings from './securitysettings';
import axios from 'axios';
import "./setting.css";

function Settings({userData,updateUser}) {

    const [timezones,setTimeZones] = useState([]);


    useEffect(() => {
        async function fetchData() {
        try {
            const timeZoneResponse = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/timezone');
            setTimeZones(timeZoneResponse.data);
        }catch (error) {
            console.error('Failed to update timezone', error);
            }
        }
        fetchData();
        
    },
    []);


    


    return (
        <div className="settings">
            <div className="settings-header">
                <h1>Settings</h1>
            </div>
            <div className="settings-container">
                <AccountSettings userData={userData} timeZoneOptions={timezones} updateUser={updateUser}/>
                <SecuritySettings />                
            </div>
        </div>

    );
}
export default Settings;

    




                   