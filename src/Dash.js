import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css';

import logo from "./components/assets/FridgeTLogo.png";
import user from "./components/assets/memberIcons/memberIcon.png";
import darkbck from "./components/assets/moon2.png";
import lightBck from "./components/assets/light_bck.png";
import themeIcon from "./components/assets/iconSwitch.png";

import Storage from './components/storage/storage';
import Members from './components/members/members';
import Setting from './components/setting/setting';

import dashIcon from "./components/assets/dashIcon.png";
import mealIcon from "./components/assets/mealIcon.png";
import setIcon from "./components/assets/setIcon.png";
import listIcon from "./components/assets/listIcon.png";
import { getAuthToken} from './components/authService';
//import { useNavigate } from 'react-router-dom';


//Child sidebar under Dashboard
const SidebarButton = ({ icon, text, onClick }) => (
    <div className="dashboardButtonC" onClick={onClick}>
        <img src={icon} alt="icon" />
        <p>{text}</p>
    </div>
);

function Dash(){

//const navigate = useNavigate();
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

 const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const UUID = getAuthToken();

                const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);

                 setUserData(response.data);
                

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const [showSelectedNav, setNav] = useState(false);

    const [showMembers, setMembers] = useState(false);
    const [showFridges, setFridges] = useState(false);
    const [showSettings, setSettings] = useState(false);

    const handleItemClick = (item) => {
        setNav(true);
        setMembers(item === 'Members');
        setFridges(item === 'Fridges');
        setSettings(item === 'Settings');
    };

    const [isOpen, setNavBar] = useState(false);

    const handleNavBar = (e) => {
        const container = e.currentTarget;
        container.classList.toggle("change");
        
        if(isOpen){
            setNavBar(false);
        } else{
            setNavBar(true);
        }
    }
    
 
    return (

        <div className={`wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
            
            <div className={`sideBarWrapper ${isOpen ? 'open' : ''}`}>

                <div className='fridgeLogoWrapper'>
                 <img src = {logo} alt = "fridge logo"/>
                </div>
                <div className='sidebarSpacer'><p>Fridge Tracker V2</p></div>
                <div className = 'dashboardButton'><img src={dashIcon} alt="d"/><p>Dashboard</p></div>

                <SidebarButton icon={dashIcon} text="Members" onClick={() => handleItemClick('Members')} />
                <SidebarButton icon={dashIcon} text="Fridge/Freezer" onClick={() => handleItemClick('Fridges')} />
                <div className = 'mealButton'><img src={mealIcon} alt="m"/><p>Meals</p></div>
                <div className = 'mealButton'><img src={listIcon} alt="m"/><p>Shopping List</p></div>
                <div className="SettingsDivButton" onClick={() => handleItemClick('Settings')}><img src={setIcon} alt="m"/><p>Settings</p></div>


                {/*<div className = 'logoutButton' onClick={() => {logoutUser(); navigate("/")}}><img src={powerIcon} alt="s"/><p>Logout</p></div>*/}
                
           
            </div>
            <div className={`contentWrapper ${isOpen ? 'open' : ''}`}>
                
                <div className= 'searchBarWrapper'>
 
                    <div class="container" onClick={handleNavBar}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                    <input type= 'text'/>
                    <p><img className="userIcon" src={user} alt=""/> {userData && userData.familyName}</p>
                    <img className="themeChanger" src={themeIcon} onClick={toggleTheme} alt="theme"></img>
                </div>
                
                {showSelectedNav ? (
                    <>  
                        {showSettings && <Setting userData={userData}/>}
                        {showMembers && <Members />}
                        {showFridges && <Storage />}
                    </>
                ):(
                    <div className = 'headerWrapper'>
                        <img src = {theme === 'light' ? lightBck : darkbck} alt = "header"></img>
                    </div>
                )}

            </div>
            
        </div>

    );
}

//poh is here ..... Rank was here...Poh was here first
export default Dash;
