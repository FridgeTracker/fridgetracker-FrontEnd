import React, { useState } from 'react';
import AdminComponent from './adminComponent';
import './Admin.css';

function AdminUser ({user}) {

    const[expandedUser, setExpandedUser] = useState(null);
    const[members, setMember] = useState(false);
    const[fridges, setFridge] = useState(false);
    const[freezers, setFreezer] = useState(false);

    const handleCategoryClick = (isMember, isFridge, isFreezer) => {
        // Toggle the clicked category
        setMember((prevState) => isMember ? !prevState : false);
        setFridge((prevState) => isFridge ? !prevState : false);
        setFreezer((prevState) => isFreezer ? !prevState : false);
    };

    const handleExpand = (userId) => {
        setExpandedUser((prevUserId) => (prevUserId === userId ? null : userId));
    };

    return (
        <>
        <div className='userOption' onClick={() => handleExpand(user.id)}>
            <p>Account Name: {user.familyName}  |  Account Email: {user.email}</p>
        </div>

        {expandedUser === user.id && (

            <div className='expandedUser'>

                <div className='editable-variables'>
                    <p>{user.familyName}</p>
                    <p>{user.email}</p>
                </div>
                <hr></hr>
                <div className='userArrays'>
                    <p id="arrayName" onClick={() => handleCategoryClick(true, false, false)}>Members</p>
                    {members && user.members.map((member) => (
                        <AdminComponent selection="member" object={member} />
                    ))}
                    {members && user.members.length > 0 && <hr />}

                    <p id="arrayName" onClick={() => handleCategoryClick(false, true, false)}>Fridges</p>
                        {fridges && user.fridges.map((fridge) => 
                            <AdminComponent selection="fridge" object={fridge} />
                        )}

                    <p id="arrayName" onClick={() => handleCategoryClick(false, false, true)}>Freezers</p>
                        {freezers && user.freezers.map((freezer) => 
                            <AdminComponent selection="freezer" object={freezer} />
                        )}
                </div>
                    
            </div>

        )}

        </>
    )
}

export default AdminUser;