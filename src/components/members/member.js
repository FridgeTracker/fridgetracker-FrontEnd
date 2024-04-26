import "./member.css";

import React, { useState } from "react";

import renderForm from "./renderForm";
import { getAuthToken } from "../authService";
import { updateMemberRequest } from "../Requests/postRequests";
import deleteIcon from "../assets/deleteIcon.png";

const Member = ({ member, updateMember, deleteMember }) => {

    const [selectedEdit, setSelectedEdit] = useState(null);
    const [message,setMesage] = useState("");

    const handleFormSubmit = async (formData) => {

        const newData = ({
            member : {...formData,id:member.id},
            userID: getAuthToken()
        });
        const response = await updateMemberRequest(newData);
        
        if(response === "Member updated successfully"){
            updateMember();
            setMesage(response);
        }else{
            setMesage(response);
        }
    };

    const memberProfileIcon = require(`../assets/memberIcons/${member.imageURL}`);

    return (
    <div className="memberContentData">
        <div className="topBar">
            <div className="styleBar"></div>
            <img src={memberProfileIcon} alt="m"/>
            <span className="memberName"><p>{member.name}<img src={deleteIcon} alt="delete" id="deleteMember" onClick={() => deleteMember(member)}/></p></span>
        </div>

        <div className="memberContentSection">
            <div className="editNavBar">
                <br></br><h2>General</h2>
                <div className="editProfile" onClick={() => {setSelectedEdit("Edit Profile"); setMesage("")}}><p>Edit Profile Settings</p></div>
                <div className="editBody" onClick={() => {setSelectedEdit("Edit Body Details"); setMesage("")}}><p>Edit Body Details</p></div>
                <div className="editFood" onClick={() => {setSelectedEdit("Edit Food Allergies"); setMesage("")}}><p>Edit Food Allergies</p></div>
                <div className="profilePicture" onClick={() => {setSelectedEdit("Change Profile Picture"); setMesage("")}}><p>Change Profile Picture</p></div>
            </div>

            <div className="editSelectionWrapper">
                <div className="editSelection">
                    <h1>{selectedEdit || 'General'}</h1>
                    <div className="choosenEdit">
                        {renderForm(member, selectedEdit, handleFormSubmit)}
                        <span className="errorMessage">{message && message}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Member;