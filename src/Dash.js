import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css';


import logo from "./components/assets/ftlogo.png";
import darkbck from "./components/assets/moon2.png";
import lightBck from "./components/assets/light_bck.png";
import themeIcon from "./components/assets/iconSwitch.png";


import Freezers from './components/freezer/freezers';
import Fridges from './components/fridge/fridges';
import Members from './components/members/members';

import dashIcon from "./components/assets/dashIcon.png";
import mealIcon from "./components/assets/mealIcon.png";
import setIcon from "./components/assets/setIcon.png";
import listIcon from "./components/assets/listIcon.png";
import powerIcon from "./components/assets/powerIcon.png";
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

    const [showMembers, setMembers] = useState(false);
    const [showFridges, setFridges] = useState(false);
    const [showFreezers, setFreezers] = useState(false);

    const handleItemClick = (item) => {
        console.log(userData);
        setMembers(item === 'Members');
        setFridges(item === 'Fridges');
        setFreezers(item === 'Freezers');
    };
 
    return (

        <div className={`wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
            
            <div className= 'sideBarWrapper'>

                <div className='fridgeLogoWrapper'>
                <img src = {logo} alt = "fridge logo"/>
                </div>
                
                <div className = 'dashboardButton'><img src={dashIcon} alt="d"/><p>Dashboard</p></div>

                <SidebarButton icon={dashIcon} text="Members" onClick={() => handleItemClick('Members')} />
                <SidebarButton icon={dashIcon} text="Fridges" onClick={() => handleItemClick('Fridges')} />
                <SidebarButton icon={dashIcon} text="Freezers" onClick={() => handleItemClick('Freezers')} />

                <div className = 'mealButton'><img src={mealIcon} alt="m"/><p>Meals</p></div>
                <div className = 'mealButton'><img src={listIcon} alt="m"/><p>Shopping List</p></div>
                <div className = 'settingsButton'><img src={setIcon} alt="s"/><p>Settings</p></div>

                <div className = 'logoutButton' onClick={() => {logoutUser(); navigate("/")}}><img src={powerIcon} alt="s"/><p>Logout</p></div>
                
           
            </div>
            <div className='contentWrapper'>
                
                <div className= 'searchBarWrapper'>
                    <input type= 'text'/>
                    <img className="themeChanger" src={themeIcon} onClick={toggleTheme} alt="theme"></img>
                </div>
                <div className = 'headerWrapper'>
                    <img src = {theme === 'light' ? lightBck : darkbck} alt = "header"></img>
                </div>

                <div className='mainSelectionArea'>
                    {showMembers && <Members />}
                    {showFridges && <Fridges />}
                    {showFreezers && <Freezers />}
                </div>

            </div>
            
        </div>

    );
}


export default Dash;
