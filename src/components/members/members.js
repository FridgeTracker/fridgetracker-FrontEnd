import "./member.css";
import { useState, useEffect } from 'react';
import memberIcon from '../assets/memberIcons/pigIcon.png'


import axios from 'axios';
import { getAuthToken } from '../authService.js';

import Member from "./member.js";

import addImage from '../assets/plus_sign.png';


function Members(){


    const [userData, setUserData] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [addMember, setAddMember] = useState(false);

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
    

      const handleAddMember = async (event) => {

        setAddMember(false);
        event.preventDefault(); 
      
        const formData = new FormData(event.target);

        const member = {
              name: formData.get("memberName"),
              age:0,
              allergies:"",
              height:0,
              weight:0
        }

        const addMember = {
            member:member,
            userID:getAuthToken()
        };
      
        try {
            await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addMember`,addMember);    
            const updatedResponse = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${getAuthToken()}`);
            setUserData(updatedResponse.data);
           
      
          } catch (error) {
            console.error('Failed to Add new Member:', error);
          } 
      
      }

      useEffect(() => {
        setUserData(userData); // Log userData when it changes
      }, [userData]);
      


      /*const memberHandler = (clickedMember) => {
    
       // setSelectedMember(clickedMember);
     
        };*/


    return (

        <div className="member">
            <div className="memberListContainer">
                <div className="memberListHolder">

                    {userData.members && userData.members.map((member) => (

                        <div className="memberHolder" onClick={() => setSelectedMember(member)}>
                          <img src={memberIcon} alt = "a" />
                          <p>{member.name}</p>
                      </div>

                    ))}

                    {userData.members && userData.members.length < 5 && (

                        <div className='addMemberButtonWrapper'>
                          
                        {addMember ? (
                          <div className='submitAddMemberWrapper'>
                            <form onSubmit={handleAddMember}>
                              <input type="text" name="memberName" placeholder='Enter Member Name Here' required/>
                              <input type="submit" placeholder='Add Member' />
                            </form>
                          </div>
                        ) :
                        (
                          <div className='addMemberButton' onClick={() => {setAddMember(true)}}>
                            <img src={addImage} alt="plus"/>
                            <p>New Member</p>
                          </div>
                        )}
                        </div>
                        )}

                </div>

            </div>

            <div className="memberContentContainer">

                <div className="memberContent">

                  {selectedMember && <Member key={selectedMember.id} member={selectedMember}/>}
                  
                </div>

            </div>
        
        
        
        
        </div>
    )
}
export default Members;