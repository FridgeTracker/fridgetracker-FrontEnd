import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { getFoodData } from '../Requests/getRequest';

const filterOptions = createFilterOptions({
    stringify: ({ foodItem, id }) => `Item: ${foodItem} ${id}`
  });


export default function ComboBox({selectedItems,setSelectedItems, member}) {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFoodData();
        setFoodData(data);
        setSelectedItems(member.allergies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  },[member.allergies, setSelectedItems]);

  return (
    <>                            
    <Autocomplete
      multiple
      id="combo-box-demo"
      size="small"
      options={foodData}
      filterOptions={filterOptions}
      groupBy={(option) => option.foodCategory}

      getOptionLabel ={({foodItem,id}) => {
        return `${id} - ${foodItem}`;
      }}
      filterSelectedOptions
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <div>
              {option.foodItem}
            </div>
          </li>
        );
      }}
      value={selectedItems.map(item => {
        const matchingOption = foodData.find(option => option.foodItem === item);
        return matchingOption || { foodItem: item };
    })}
      onChange={(event,value) => setSelectedItems(value.map(item => item.foodItem))}
      sx={{ width: '60vh'}}
      renderInput={(params) => <TextField {...params} label="Add Allergie Items"/>}
      
    />

</>
  );
}