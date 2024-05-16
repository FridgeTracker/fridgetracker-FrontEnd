import React from 'react';

const AdminFridge = ({ fridge }) => {
    
    return (
    <div className="adminFridge">
        <p>{fridge.storageName}</p>
    </div>
)};

const AdminMember = ({ member }) => {
    
    return (
    <div className="adminMember">
        <p>{member.name}</p>
    </div>
)};

const AdminFreezer = ({ freezer }) => {
    
    return (
    <div className="adminFreezer">
        <p>{freezer.storageName}</p>
    </div>
)};


function AdminComponent({ selection, object }){

   switch (selection) {
        case "member":
            return <AdminMember member={object} />;
        case "fridge":
            return <AdminFridge fridge={object} />;
        case "freezer":
            return <AdminFreezer freezer={object} />;
        default:
            return null;
    }

}

export default AdminComponent;
