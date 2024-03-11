import { useState } from 'react';
//import axios from 'axios';
import './Dash.css';
import logo from "./assets/Fridge_logo.png";
import headerImage from "./assets/image.png";
import Freezers from './components/freezers';
import Fridges from './components/fridges';
import Members from './components/members';

import dashIcon from "./assets/dashIcon.png";
import mealIcon from "./assets/mealIcon.png";
import setIcon from "./assets/setIcon.png";
import powerIcon from "./assets/powerIcon.png";

function Dash(){

/*const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const userEmail = localStorage.getItem('userEmail');

                const response = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getUser', {
                    headers: { 'email-tkn': userEmail }
                  });
                  
                setUserData(response.data);

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);*/
    const [showMembers, setMembers] = useState(false);
    const [showFridges, setFridges] = useState(false);
    const [showFreezers, setFreezers] = useState(false);

  const membersHandler = () => {
    setMembers(true);
    setFridges(false);
    setFreezers(false);
  }
  const fridgesHandler = () => {
    setMembers(false);
    setFridges(true);
    setFreezers(false);
  }
  const freezersHandler = () => {
    setMembers(false);
    setFridges(false);
    setFreezers(true);
  }
 

    return (
       /* <div>
            {userData ? (
                <div>
                    <p>ID: {userData.id}</p>
                    <p>Email: {userData.email}</p>
                    <p>Rank: {userData.rank}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <img src = {logo} alt = "fridge logo"/>
        </div>*/

        <div className = 'wrapper'>
            
            <div className= 'sideBarWrapper'>

                <div className='fridgeLogoWrapper'>
                <img src = {logo} alt = "fridge logo"/>
                </div>

                <div className = 'dashboardButton'><img src={dashIcon} alt="d"/><p>Dashboard</p></div>
                <div className = 'mealButton'><img src={mealIcon} alt="m"/><p>Meals</p></div>
                <div className = 'settingsButton'><img src={setIcon} alt="s"/><p>Settings</p></div>
                <div className = 'logoutButton'><img src={powerIcon} alt="s"/><p>Logout</p></div>
           
            </div>
            <div className='contentWrapper'>
                <div className= 'searchBarWrapper'>
                    <input type= 'text'/>
                </div>
                <div className = 'headerWrapper'>
                    <img src = {headerImage} alt = "header"></img>
                </div>
                <div className='iconHolder' tabIndex="0">
                    <div className='membersButton' onClick = {membersHandler}><p>Members</p></div>
                    <div className='fridgesButton' onClick = {fridgesHandler}><p>Fridges</p></div>
                    <div className='freezersButton' onClick={freezersHandler}><p>Freezers</p></div>
                </div>
                <div className = 'mainBodyWrapper'>
                {showMembers && <Members />}
                {showFridges && <Fridges />}
                {showFreezers && <Freezers />}
         
                </div>
            </div>
            
        </div>

    );
}


export default Dash;
