import { useState, useEffect } from 'react';

import "./fridge.css";

import axios from 'axios';

import Fridge from './fridge.js';
import Item from '../item/item.js';
import { getAuthToken } from '../authService.js';


function Fridges() {

  const [userData, setUserData] = useState({});
  const [selectedFridge, setSelectedFridge] = useState(null);

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

    const updatedFridges = userData.fridges.map(fridge => {
        if (fridge.id === clickedFridge.id) {
            fridge.selected = !fridge.selected;
        } else {
            fridge.selected = false;
        }
        return fridge;
    });

    setSelectedFridge(clickedFridge);

    setUserData(prevUserData => ({
        ...prevUserData,
        fridges: updatedFridges
    }));

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
            <p className='title'>Fridges</p>
            <div className = "itemWrapper">
              <div className='itemListHolder'>
                {selectedFridge && selectedFridge.items.map((item) =>
                  <Item key={item.fridgeid} Item={item}/>
                  )}
              </div>
            </div> 
        </div>

      </div>

    </div>
  );
}

export default Fridges;
