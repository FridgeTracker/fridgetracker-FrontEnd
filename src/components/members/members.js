import "./member.css";
import { useState, useEffect } from 'react';


import axios from 'axios';
import { getAuthToken } from '../authService.js';

import Member from "./member.js";


function Members(){


    const [userData, setUserData] = useState({});
    //const [selectedMember, setSelectedMember] = useState(null);


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
      }, []); // Empty dependency array ensures the effect runs only once on mount
    
    
      useEffect(() => {
        console.log(userData); // Log userData when it changes
      }, [userData]);

      const memberHandler = (clickedMember) => {
    
       // setSelectedMember(clickedMember);
     
        };


    return (

        <div className="member">

            <div className="memberListContainer">

                <div className="memberListHolder">

                    {userData.members && userData.members.map((member) => (
                        <Member key={member.id} member={member} onMemberClick={memberHandler} />
                    ))}

                </div>

            </div>

            <div className="memberContentContainer">

                <div className="titleHolder">
                    <p>Members</p>
                </div>
                
                <div className="memberContent">

                </div>

            </div>
        
        
        
        
        </div>
    )
}
export default Members;