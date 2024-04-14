import "./setting.css";






/*import userIcon from "../assets/memberIcons/memberIcon.png";

const Setting = ({}) => {
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChangeEmail = async () => {
      
            const newData = { 
                newEmail, 
                userID: getAuthToken() 
            };
            
                await axios.post('https://example.com/api/changeEmail',newData);
                setSuccessMessage("Email changed Successfully.");
            
                setNewEmail();
        };
        const hangleChangePassword = async () => {
            try{
                const newData = { 
                    newPassword, 
                    userID: getAuthToken() 
                };
                
                    await axios.post('https://example.com/api/changeEmail',newData);
                    setSuccessMessage("Password changed Successfully.");
                    
                    
                }
            };

        

    
}*/

function Setting({userData}){
    return(
        <div className="setting">

            <div className="settingTopBar">
            </div>
            <span className="settingIcon">
                <img src={userIcon} alt="User Icon"/>
                <p>{userData.familyName}</p>
            </span>

                <div className="settingWrapper">
                    <div className="generalsidebar">
                        <br /><h2>General</h2>
                            <div className="userInfo">User Info</div>
                            <div className="changeEmail" /*onClick={()}*/>Change Email</div>
                            <div className="changePassword">Change Password</div>

                        <br /><h2>Timezone</h2>
                            <div className="changeLocation">Change Location</div>
                        <br /><h2>Metric Unit</h2>
                            <div className="changeUnit">Change Units</div>
                        <br /><h2>Logout</h2>
                    </div>

                    <div className="EditingContent">
                        <div className="EditingSection">Change Email</div>
                        
                    </div>

                </div>

        </div>
    
    )
}
export default Setting;


