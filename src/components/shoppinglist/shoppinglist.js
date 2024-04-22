import './shoppinglist.css';
import { useState, useEffect } from 'react';
import sausage from '../assets/sausage.png';
import React from 'react';

function ShoppingList() {
    const [selectedListName, setSelectedListName] = useState("SHOPPING LIST - 1");
    const [lists, setLists] = useState(["SHOPPING LIST - 1"]);
    const [listItems, setListItems] = useState({
        "SHOPPING LIST - 1": [
            { name: "Apple", quantity: 3, type: "Fruit" }
        ]
    });
    const [editMode, setEditMode] = useState(false);
    const [editList, setEditList] = useState(null);
    const [newItemFields, setNewItemFields] = useState({ name: '', quantity: '', type: '' });

    useEffect(() => {
        setEditList(null);
    }, [selectedListName]);

    const createNewList = () => {
        const newListName = `SHOPPING LIST - ${lists.length + 1}`;
        setLists([...lists, newListName]);
        setSelectedListName(newListName);
        setListItems({ ...listItems, [newListName]: [] });
    }

    const toggleEditMode = () => {
        if (!editMode) {
            const currentList = listItems[selectedListName];
            setEditList(currentList.map(item => ({ ...item })));
        } else {
            setEditList(null);
        }
        setEditMode(!editMode);
    }

    const handleQuantityChange = (index, event) => {
        const value = event.target.value;
        // positive numbers
        if (/^\d+$/.test(value) || value === '') {
            const newListItems = [...editList];
            newListItems[index] = { ...newListItems[index], quantity: value === '' ? '' : parseInt(value) };
            setEditList(newListItems);
        }
    }

    const handleNewItemFieldChange = (field, value) => {
        setNewItemFields({ ...newItemFields, [field]: value });
    }

    const addNewItem = () => {
        const newItem = {
            name: newItemFields.name,
            quantity: parseInt(newItemFields.quantity),
            type: newItemFields.type
        };
        setEditList(prevList => prevList ? [...prevList, newItem] : [newItem]);
        setNewItemFields({ name: '', quantity: '', type: '' });
    }

    const saveChanges = () => {
        setListItems(prevState => ({
            ...prevState,
            [selectedListName]: editList
        }));
        setEditMode(false);
    }

    return (
        <div className='shoppingList'>
            <div><img className="sausageImage" src={sausage} alt="sausage" /></div>

            <div className='shoppingListHolder'>
                <div className="shoppingListNameHolder">
                    <div className="listNameTitle">Shopping List</div>
                    {lists.map((listName, index) => (
                        <div key={listName} className={`listName ${selectedListName === listName ? "active" : ""}`} onClick={() => setSelectedListName(listName)}>{listName}</div>
                    ))}
                    <div className="createNewS_list" onClick={createNewList}>Create New List</div>
                </div>

                <div className="individual_shoppingList">
                    <div className='individualS_listTitle'>{selectedListName}</div>
                    <div className='s_listItem'>
                        <div className='ItemTitle'>
                            <table id="titleTable">
                                <tr>
                                    <td id="foodName">Food Name</td>
                                    <td id="quantity">Quantity</td>
                                    <td id="type">Type</td>
                                </tr>
                            </table>
                        </div>
                        <div className='eachItem'>
                            <table id="eachItemTable">
                                {(!editMode ? listItems[selectedListName] : editList) && (!editMode ? listItems[selectedListName] : editList).map((item, index) => (
                                    <tr key={index}>
                                        <td id="foodName">{item.name}</td>
                                        <td id="quantity">
                                          <input type="number" min="0" value={item.quantity} onChange={(event) => handleQuantityChange(index, event)}/>
                                        </td>
                                        <td id="type">{item.type}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                    {editMode && (
                        <div className='editModeButtons'>
                            <div className='saveButton' onClick={saveChanges}>Save Changes</div>
                            <div className='discardbutton' onClick={toggleEditMode}>Discard Changes</div>
                            <div className='addnewButton' onClick={addNewItem}>Add New Item</div>
                        </div>
                    )}
                    {!editMode && (
                        <div className='s_listOptions'>
                            <div id="edit" onClick={toggleEditMode}>Edit List</div>
                            <div id="delete">Delete List</div>
                            <div id="import">Import/Export</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShoppingList;
