import "./member.css";

import React, { useState } from "react";

import renderForm from "./renderForm";
import { getAuthToken } from "../authService";
import { updateItemRequest } from "../Requests/postRequests";

const Member = ({ member, updateMember }) => {

    const [selectedEdit, setSelectedEdit] = useState(null);

    const handleFormSubmit = async (formData) => {

        const newData = ({
            member : {...formData,id:member.id},
            userID: getAuthToken()
        });
            
        await updateItemRequest(newData);
        updateMember();
       
    };

    const testIcon = require(`../assets/memberIcons/${member.imageURL}`);

    return (
    <div className="memberContentData">
        <div className="topBar">
            <div className="styleBar"></div>
            <img src={testIcon} alt="m"/>
            <span className="memberName"><p>{member.name}</p></span>
        </div>

        <div className="memberContentSection">
            <div className="editNavBar">
                <br></br><h2>General</h2>
                
                <div className="editProfile" onClick={() => {setSelectedEdit("Edit Profile")}}><p>Edit Profile Settings</p></div>
                <div className="editBody" onClick={() => {setSelectedEdit("Edit Body Details")}}><p>Edit Body Details</p></div>
                <div className="editFood" onClick={() => {setSelectedEdit("Edit Food Preferences")}}><p>Edit Food Preferences</p></div>
                <div className="profilePicture" onClick={() => {setSelectedEdit("Change Profile Picture")}}><p>Change Profile Picture</p></div>

            </div>

            <div className="editSelectionWrapper">
                <div className="editSelection">
                    <h1>{selectedEdit || 'General'}</h1>
                    <div className="choosenEdit">

                        {renderForm(member, selectedEdit, handleFormSubmit)}
                        
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    );
}

export default Member;