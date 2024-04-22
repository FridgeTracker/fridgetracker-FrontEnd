import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';

import "./item.css";
import { getFoodData } from '../Requests/getRequest';



const filterOptions = createFilterOptions({
    stringify: ({ foodItem, id }) => `Item: ${foodItem} ${id}`
  });


export default function ComboBox({handleSubmit}) {
  const [foodData, setFoodData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchFoodData() {
      try {
        setFoodData(await getFoodData());
      } 
      catch (error) {
        console.error('Error fetching food data:', error);
      }
    }

    fetchFoodData();
  }, []);

  return (
    <>               

       <form className="addItemForm" onSubmit={(event) => handleSubmit(selectedItem, event)}>                 
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={foodData}
      filterOptions={filterOptions}
      groupBy={(option) => option.foodCategory}

      getOptionLabel ={({foodItem,id}) => {
        return `${id} - ${foodItem}`;
      }}

      renderOption={(props, option) => {
        return (
          <li {...props}>
            <div>
              {option.foodItem}
            </div>
          </li>
        );
      }}
      onChange={(event, newValue) => {
        setSelectedItem(newValue);
      }}
      sx={{ width: '80%'}}
      renderInput={(params) => <TextField {...params} label="Food Item"/>}
      
    />

    
    <p>Quantity</p>
    <input id="addItem" type="number" name="quantity" placeholder="Enter Quantity"/>
    
    <p>Expiry Date</p>
    <input id="addItem" type="date" name="expiryDate" placeholder="Enter Expiry Date"/>
    
    <input type="submit" value="Submit" className="submitButtonItem"/>

</form>

</>
  );
}
