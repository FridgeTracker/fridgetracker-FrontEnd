import "./member.css";
import { useState, useEffect } from 'react';
import { getAuthToken } from '../authService.js';

import Member from "./member.js";

import addImage from '../assets/plus_sign.png';
import { getUser } from "../Requests/getRequest.js";
import { addMemberRequest, deleteMemberRequest } from "../Requests/postRequests.js";

function Members(){


    const [userData, setUserData] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [addMember, setAddMember] = useState(false);

    const handleUpdateMember = async () => {
      try {
        const user_Data = await getUser();
        setUserData(user_Data);
        const updatedSelectedMember = user_Data.members.find(member => member.id === selectedMember.id);
       
        if (updatedSelectedMember) {
            setSelectedMember(updatedSelectedMember);
        }

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const user_Data = await getUser();
            setUserData(user_Data);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
        fetchUserData();
      }, []); 
    

      const handleAddMember = async (event) => {

        setAddMember(false);
        event.preventDefault(); 
      
        const formData = new FormData(event.target);

        const member = {
              name: formData.get("memberName"),
              age:20,
              allergies:[],
              preference:[],
              height:170,
              weight:60,
              imageURL:'ftlogo.png'
        }

        const addMember = {
            member:member,
            userID:getAuthToken()
        };
      
        try {
            setUserData(await addMemberRequest(addMember));
          } 
          catch (error) {
            console.error('Failed to Add new Member:', error);
          } 
      
      }

      const deleteMember = async (member) => {
 
        try{
          await deleteMemberRequest(member);
          setUserData(await getUser());
          setSelectedMember(null);

        } catch(error) {
          console.error(error);
        }
      }

      useEffect(() => {
        setUserData(userData); // Log userData when it changes
      }, [userData]);
      

    return (

        <div className="member">
            <div className="memberListContainer">
                <div className="memberListHolder">

                    {userData.members && userData.members.map((member) => (

                        <div className={"memberHolder" + (selectedMember === member ? " selected" : "")} onClick={() => {setSelectedMember(member); setAddMember(false);}}>
                          <img src={require(`../assets/memberIcons/${member.imageURL}`)} alt = "a" />
                          <p>{member.name}</p>
                      </div>

                    ))}

                    {userData.members && userData.members.length < 5 && (

                        <div className='addMemberButtonWrapper'>
                          
                        {addMember ? (
                          <div className='submitAddMemberWrapper'>
                            <form onSubmit={handleAddMember}>
                              <input type="text" name="memberName" placeholder='Enter Member Name Here' required/>
                              <input id="memberAddSubmit" type="submit" value='Add Member' />
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

                  {selectedMember && <Member key={selectedMember.id} member={selectedMember} updateMember={handleUpdateMember} deleteMember={deleteMember}/>}
                  
                </div>

            </div>
        
        
        </div>
    )
}
export default Members;