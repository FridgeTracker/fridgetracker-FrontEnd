import { useState, useEffect } from 'react';

import "./fridge.css";
import "../item/item.css";

import axios from 'axios';

import Fridge from './fridge.js';
import Item from '../item/item.js';
import { getAuthToken } from '../authService.js';

import addImage from '../assets/plus_sign.png';


function Fridges() {

  const [userData, setUserData] = useState({});
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [selectedItem, setItem] = useState(null);
  const [addItem, setAdd] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const UUID = getAuthToken();
        const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
        setUserData(response.data);

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  useEffect(() => {
    console.log(userData); // Log userData when it changes
  }, [userData]);

  const fridgeHandler = (clickedFridge) => {
    setItem(null);
    setAdd(false);
  
    if (!selectedFridge || selectedFridge.id !== clickedFridge.id) {
      setSelectedFridge(clickedFridge);
      setUserData((prevUserData) => ({
        ...prevUserData,
        fridges: prevUserData.fridges.map((fridge) => ({
          ...fridge,
          selected: fridge.id === clickedFridge.id,
        })),
      }));
    }
  };


const handleUpdateFridge = async () => {
  try {
      const UUID = getAuthToken();
      const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
      setUserData(response.data);

      if (selectedFridge) {
        const updatedFridge = response.data.fridges.find(fridge => fridge.id === selectedFridge.id);
        setSelectedFridge(updatedFridge); // Update selectedFridge with the new data
    }

  } catch (error) {
      console.error('Failed to fetch user data:', error);
  }
};


  return (

    <div className="fridge">
      
      <div className="fridgeListWrapper">

        <div className="fridgeListHolder">

          {userData.fridges && userData.fridges.map((fridge) => (
          <Fridge key={fridge.id} fridge={fridge} onFridgeClick={fridgeHandler} />
          ))}

        </div>

      </div>

      <div className='itemContainer'>

        <div className='itemListContainer'>
            <p className='title'>Items</p>
            <div className = "itemWrapper">
              <div className='itemListHolder'>

              {selectedFridge && 
                <>
                  {selectedFridge.items.map((item) => (
                    <div className="itemButton" onClick={() => {setItem(item); setAdd(false)}}>
                      <p>Name: {item.foodName} | Quantity: {item.quantity}</p>
                    </div>
                  ))}
                  <div className="addItemButton" onClick={() => setAdd(true)}>
                    <p><img src={addImage} alt='add' className='addItem' /></p>
                  </div>
                </>
              }

              </div>
            </div> 
        </div>

        <div className='itemDetailWrapper'>
          {addItem ? (
            <>
               <p className='itemTitle'>Add Item</p>
                  <div className='itemCard'>
                    {console.log(selectedFridge.id)}
                      <Item fridgeId={selectedFridge.id} updateFridge={handleUpdateFridge}></Item>
                  </div>
            </>
          ) : (
              <>
                {selectedItem && 
                <>
                  <p className='itemTitle'>Item</p>
                  <div className='itemCard'>
                    <Item key={selectedItem.id} Item={selectedItem}/>
                  </div>
                </>
                }
              </>
            )}
        </div>

      </div>

    </div>
  );
}

export default Fridges;
