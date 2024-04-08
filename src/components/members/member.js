import "./member.css";

import React, { useState } from "react";

import memberIcon from '../assets/memberIcon.png'

const Member = ({ member }) => {

    const [selectedEdit, setSelectedEdit] = useState(null);



    return (
    <div className="memberContentData">
        <div className="topBar">
            <div className="styleBar"></div>
            <img style={{"width":"13%"}}src={memberIcon} alt="m"/>
            <span className="memberName"><p>{member.name}</p></span>
        </div>

        <div className="memberContentSection">
            <div className="editNavBar">
                <h2>General</h2><br></br>
                
                <div className="editAge" onClick={() => {setSelectedEdit("Age")}}><p>Edit Age</p></div>
                <div className="editName" onClick={() => {setSelectedEdit("Name")}}><p>Edit Name</p></div>
                <div className="editHeight" onClick={() => {setSelectedEdit("Height")}}><p>Edit Height</p></div>
                <div className="editWeight" onClick={() => {setSelectedEdit("Weight")}}><p>Edit Weight</p></div>
                <div className="editAllergies" onClick={() => {setSelectedEdit("Allergies")}}><p>Edit Allergies</p></div>
                <div className="editFood" onClick={() => {setSelectedEdit("Food Preferences")}}><p>Preferred Food</p></div>
            </div>
            <div className="editSelectionWrapper">
                <div className="editSelection">
                    <h1>{selectedEdit || 'General'}</h1>
                    <div className="choosenEdit">
                        {selectedEdit ? (
                        <p>Editing {selectedEdit}</p>
                        
                    
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