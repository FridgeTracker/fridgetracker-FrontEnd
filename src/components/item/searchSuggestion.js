import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';

import "./item.css";

const filterOptions = createFilterOptions({
    stringify: ({ foodItem, id }) => `Item: ${foodItem} ${id}`
  });


export default function ComboBox({handleSubmit, foodData}) {

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>               

       <form className="addItemForm" onSubmit={(event) => handleSubmit(selectedItem, event)}>                 
    {foodData && <Autocomplete
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
  }

    
    <p>Quantity</p>
    <input id="addItem" type="number" name="quantity" placeholder="Enter Quantity"/>
    
    <p>Expiry Date</p>
    <input id="addItem" type="date" name="expiryDate" placeholder="Enter Expiry Date"/>
    
    <input type="submit" value="Submit" className="submitButtonItem"/>

</form>

</>
  );
}
