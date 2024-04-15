import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css';

import logo from "./components/assets/fridgeLogo.png";
import user from "./components/assets/memberIcons/memberIcon.png";
import darkbck from "./components/assets/moon2.png";
import lightBck from "./components/assets/light_bck.png";
import themeIcon from "./components/assets/iconSwitch.png";
import searchIcon from "./components/assets/searchIcon.png";

import Storage from './components/storage/storage';
import Members from './components/members/members';
import Setting from './components/setting/setting';
import Dashboard from './components/dashboard/dashboard';
import powerIcon from './components/assets/powerIcon.png';

import dashIcon from "./components/assets/dashIcon.png";
import membersIcon from "./components/assets/membersIcon.png";
import mealIcon from "./components/assets/mealIcon.png";
import setIcon from "./components/assets/setIcon.png";
import listIcon from "./components/assets/listIcon.png";
import ffIcon from "./components/assets/ffIcon.png";
import { getAuthToken, logoutUser} from './components/authService';
import { useNavigate } from 'react-router-dom';


//Child sidebar under Dashboard
const SidebarButton = ({ icon, text, onClick }) => (
    <div className="dashboardButtonC" onClick={onClick}>
        <img src={icon} alt="icon" />
        <p>{text}</p>
    </div>
);

function Dash(){

const navigate = useNavigate();
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

 const [userData, setUserData] = useState(null);

    useEffect(() => {
        setDashboard(true);
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

   if(getAuthToken() == null){
    navigate("/");
   }

    const [showSelectedNav, setNav] = useState(false);

    const [showMembers, setMembers] = useState(false);
    const [showFridges, setFridges] = useState(false);
    const [showSettings, setSettings] = useState(false);
    const [showDashboard, setDashboard] = useState(false);


    const handleItemClick = (item) => {
        setNav(true);
        setMembers(item === 'Members');
        setFridges(item === 'Fridges');
        setSettings(item === 'Settings');
        setDashboard(item === 'Dashboard');
      
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

                <div className='navBarTitle'> <p>DASHBOARD</p></div>
                <SidebarButton icon={dashIcon} text="Overview" onClick={() => handleItemClick('Dashboard')}/>
                <SidebarButton icon={membersIcon} text="Members" onClick={() => handleItemClick('Members')} />
                <SidebarButton icon={ffIcon} text="Fridge/Freezer" onClick={() => handleItemClick('Fridges')} />

                <div className='navBarTitle'> <p>EXTRAS</p></div>
                <SidebarButton icon={mealIcon} text="Meals" onClick={() => handleItemClick('Meals')} />
                <SidebarButton icon={listIcon} text="Shopping List" onClick={() => handleItemClick('Shopping List')} />

                <div className='navBarTitle'> <p>ACCOUNT</p></div>
                <SidebarButton icon={setIcon} text="Account Settings" onClick={() => handleItemClick('Settings')} />
                <SidebarButton icon={powerIcon} text="Logout" onClick={() => {logoutUser(); navigate("/")}} />
                
           
            </div>
            <div className={`contentWrapper ${isOpen ? 'open' : ''}`}>
                
                <div className= 'searchBarWrapper'>
 
                    <div class="container" onClick={handleNavBar}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>
                    <input type= 'text'></input>
                    <img className="searchIcon" src={searchIcon} alt='a'/>
                    <p><img className="userIcon" src={user} alt=""/> {userData && userData.familyName}</p>
                    <img className="themeChanger" src={themeIcon} onClick={toggleTheme} alt="theme"></img>
                </div>
                
                {showSelectedNav ? (
                    <>  
                        {showSettings && <Setting userData={userData}/>}
                        {showMembers && <Members />}
                        {showFridges && <Storage />}
                        {showDashboard && <Dashboard />}
                    </>
                ):(
                    <>
                        <div className = 'headerWrapper'>
                            <img src = {theme === 'light' ? lightBck : darkbck} alt = "header"></img>
                        </div>
                    </>
                )}

            </div>
            
        </div>

    );
}

//poh is here ..... Rank was here...Poh was here first
export default Dash;
