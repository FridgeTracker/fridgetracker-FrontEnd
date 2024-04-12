import React from "react";

import selection1 from '../assets/memberIcons/penguinIcon.png'
import selection2 from '../assets/memberIcons/dogIcon.png'
import selection3 from '../assets/memberIcons/fox.png'
import selection4 from '../assets/memberIcons/hippo.png'
import selection5 from '../assets/memberIcons/pandaIcon.png'
import selection6 from '../assets/memberIcons/pigIcon.png'
import selection7 from '../assets/memberIcons/tigerIcon.png'
import selection8 from '../assets/memberIcons/puppyIcon.png'
import selection9 from '../assets/memberIcons/birdIcon.png'
import selection10 from '../assets/memberIcons/bearIcon.png'
import selection11 from '../assets/memberIcons/sealIcon.png'
import selection12 from '../assets/memberIcons/deerIcon.png'

const renderForm = (member, selectedEdit, handleFormSubmit) => {
    switch (selectedEdit) {
        case "Edit Profile":
            return <ProfileForm handleFormSubmit={handleFormSubmit} member={member} />;
        case "Edit Body":
            return <BodyForm handleFormSubmit={handleFormSubmit} />;
        case "Edit Food Preferences":
            return <FoodForm handleFormSubmit={handleFormSubmit} />;
        case "Change Profile Picture":
            return <ProfilePictureForm handleFormSubmit={handleFormSubmit} member={member} />;
        default:
            return <GeneralInfo />;
    }
};

const GeneralInfo = () => (
    <p>Change the general information for your <br />member account</p>
);

const ProfileForm = ({ member, handleFormSubmit }) => {

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = ({
            name:formData.get("memberName"),
            age:formData.get("memberAge")
        });

        handleFormSubmit(newData);
    };

    return (
        <div className="memberProfileSettings">

            <div className="currentDetails">
                <p>Current Member Name: {member.name}</p>
                <p>Current Member Age: {member.age}</p>
            </div>

            <form onSubmit={handleSubmit} >
                <table>
                    <tr><td style={{ width: '20%' }}>Change Name:</td>
                    <td><input type="text" placeholder="Enter new name here" name="memberName" required/></td></tr>
                    <tr><td>Change Age:</td>
                    <td><input type="number" placeholder="Enter new age here" name="memberAge" required/></td></tr>
                    <tr><td colSpan="2" style={{ textAlign: 'center' }}><button type="submit">Save</button></td></tr>

                    </table>
            </form>
        </div>
    );
};

const BodyForm = ({ handleFormSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="editFormLayout">
            {/* Add your form fields for Body here */}
            <button type="submit">Submit</button>
        </form>
    );
};

const FoodForm = ({ handleFormSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
      
    };

    return (
        <form onSubmit={handleSubmit} className="editFormLayout">
            {/* Add your form fields for Food Preferences here */}
            <button type="submit">Submit</button>
        </form>
    );
};

const ProfilePictureForm = ({ handleFormSubmit, member }) => {

    const handleSubmit = (e) => {

        const newData = ({
            imageURL:e
        });

        handleFormSubmit(newData);
      
    };

    const memberProfile = require(`../assets/memberIcons/${member.imageURL}`);

    return (
        <div className="changeProfilePictureWrapper">
            <div className="currentProfile">
                <img src={memberProfile} alt="pig"/>
            </div>
            <p>Choose Icon</p>
            <div className="selectionIcon">
                <img src={selection1} alt="s1" onClick={() => handleSubmit('penguinIcon.png')}/>
                <img src={selection8} alt="s1" onClick={() => handleSubmit('puppyIcon.png')}/>
                <img src={selection9} alt="s1" onClick={() => handleSubmit('birdIcon.png')}/>
                <img src={selection10} alt="s1" onClick={() => handleSubmit('bearIcon.png')}/>
                <img src={selection11} alt="s1" onClick={() => handleSubmit('sealIcon.png')}/>
                <img src={selection12} alt="s1" onClick={() => handleSubmit('deerIcon.png')}/>
                <img src={selection7} alt="s1" onClick={() => handleSubmit('tigerIcon.png')}/>
                <img src={selection2} alt="s1" onClick={() => handleSubmit('dogIcon.png')}/>
                <img src={selection3} alt="s1" onClick={() => handleSubmit('fox.png')}/>
                <img src={selection4} alt="s1" onClick={() => handleSubmit('hippo.png')}/>
                <img src={selection5} alt="s1" onClick={() => handleSubmit('pandaIcon.png')}/>
                <img src={selection6} alt="s1" onClick={() => handleSubmit('pigIcon.png')}/>
                
            </div>
        </div>
    );
};

export default renderForm;
