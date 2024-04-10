import "./setting.css";
import {useState, useEffect } from 'react';
import axios from 'axios';

function Setting(){
    return(
        <div className="outerborder">
        <div className="generalsidebar">
            <br></br><h2>General</h2>
                    <div className="userInfo">User Info</div>
                    <div className="changeEmail">Change Email</div>
                    <div className="changePassword">Change Password</div>

            <br></br><h2>Timezone</h2>
                <div className="changeLocation">Change Location</div>
            <br></br><h2>Metric Unit</h2>
                <div className="changeUnit">Change Units</div>
        </div>
        <div className="EditingContent">Change</div>
        
        
        
        </div>
    )
}
export default Setting;


