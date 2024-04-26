import "./member.css";
import { useState, useEffect } from 'react';

import Member from "./member.js";

import addImage from '../assets/plus_sign.png';
import { getUser } from "../Requests/getRequest.js";
import memberService from "./memberService.js";

function Members(){

    const [userData, setUserData] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [addMember, setAddMember] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
        setUserData(await getUser());
      };
      fetchUserData();
    }, []); 

    
    const handleUpdateMember = async () => {
      memberService.handleUpdateMember(setUserData, selectedMember, setSelectedMember);
    }
    
    const handleAddMember = async (event) => {
      memberService.handleAddMember(event, setAddMember, setUserData);
    }

    const deleteMember = async (member) => {
      memberService.deleteMember(member,setUserData,setSelectedMember);
    }
      
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