import "./member.css";

import React from "react";

import memberIcon from '../assets/memberIcon.png'

const Member = ({ member, onMemberClick }) => {

    return (
    <div className="memberHolder" onClick={() => onMemberClick(member)}>
        <img src={memberIcon} alt = "a" />
        <p>{member.name}</p>
    </div>
    );
}

export default Member;