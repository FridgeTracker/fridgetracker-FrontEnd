import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { createFilterOptions } from '@mui/material/Autocomplete';



const filterOptions = createFilterOptions({
    stringify: ({ foodItem, id }) => `Item: ${foodItem} ${id}`
  });


export default function ComboBox({handleSubmit}) {
  const [foodData, setFoodData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchFoodData() {
      try {
        const response = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getFoodData');
        setFoodData(response.data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    }

    fetchFoodData();
  }, []);

  return (
    <>
   <form className="addItemForm" onSubmit={(event) => handleSubmit(selectedItem, event)}>
                <p>Food Name</p>               
                        
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={foodData}
      filterOptions={filterOptions}
      groupBy={(option) => option.foodCategory}
      getOptionLabel ={({foodItem,id}) => {
        return `${id} ${foodItem}`;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <div
              sx={{
                backgroundColor: "red",
                color: "orange"
              }}
            >
              {option.foodItem}
            </div>
          </li>
        );
      }}
      onChange={(event, newValue) => {
        setSelectedItem(newValue);
        console.log(newValue);
      }}
      sx={{ width: '80%',height: '15%'}}
      renderInput={(params) => <TextField {...params} label="Food Item" />}
      
    />

    <p>Quantity</p>
    <input id="addItem" type="number" name="quantity" placeholder="Enter Quantity"/>
    
    <input type="submit" value="Submit" className="submitButtonItem"/>

</form>

</>
  );
}