import "./member.css";

import React from "react";

import memberIcon from '../assets/memberIcon.png'

const Member = ({ member }) => {

    return (
    <div className="memberContentData">
        <img style={{"width":"10%"}}src={memberIcon} alt="m"/>
        <p>{member.name}</p>
        <p>Age: {member.age}</p>
        <p>allergies: {member.allergies}</p>
        <p>height: {member.height}</p>
        <p>weight: {member.weight}</p>
        {console.log(member)}
    </div>
    );
}

export default Member;