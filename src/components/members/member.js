import "./member.css";

import React, { useState } from "react";

import memberIcon from '../assets/memberIcons/pigIcon.png'

const Member = ({ member }) => {

    const [selectedEdit, setSelectedEdit] = useState(null);
    const [currentValue, setCurrentValue] = useState("");
    const [newValue, setNewValue] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to backend)
        console.log("Current Value:", currentValue);
        console.log("New Value:", newValue);
        console.log("Password:", password);
        // Reset form fields after submission
        setCurrentValue("");
        setNewValue("");
        setPassword("");
    };


    return (
    <div className="memberContentData">
        <div className="topBar">
            <div className="styleBar"></div>
            <img src={memberIcon} alt="m"/>
            <span className="memberName"><p>{member.name}</p></span>
        </div>

        <div className="memberContentSection">
            <div className="editNavBar">
                <br></br><h2>General</h2>
                
                <div className="editProfile" onClick={() => {setSelectedEdit("Profile")}}><p>Edit Profile</p></div>
                <div className="editBody" onClick={() => {setSelectedEdit("Body")}}><p>Edit Body</p></div>
                <div className="editFood" onClick={() => {setSelectedEdit("Food Preferences")}}><p>Edit Food Preferences</p></div>
                <div className="profilePicture" onClick={() => {setSelectedEdit("Profile Picture")}}><p>Edit Profile Picture</p></div>

            </div>

            <div className="editSelectionWrapper">
                <div className="editSelection">
                    <h1>{selectedEdit || 'General'}</h1>
                    <div className="choosenEdit">
                        {selectedEdit ? (
                            <>
                                <p>Editing {selectedEdit}</p>

                                <form onSubmit={handleFormSubmit} className="editFormLayout">

                                    <input type="text" id="currentValue" value={currentValue} placeholder={`Enter Current ${selectedEdit}`} onChange={(e) => setCurrentValue(e.target.value)} required />
                                    <input type="text" id="newValue" value={newValue} placeholder={`Enter New ${selectedEdit}`} onChange={(e) => setNewValue(e.target.value)} required />
                                    
                                    <button type="submit">Submit</button>
                                </form>
                            </>
                    
                        ):(
                        <> 
                        <p>Change the general information for your <br></br> member account</p>
                        </>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    );
}

export default Member;