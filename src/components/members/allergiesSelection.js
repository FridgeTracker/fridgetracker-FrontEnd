import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { getFoodData } from '../Requests/getRequest';

const filterOptions = createFilterOptions({
    stringify: ({ foodItem, id }) => `Item: ${foodItem} ${id}`
  });


export default function ComboBox({selectedAllergies, setSelectedAllergies, selectedPreferences, setSelectedPreferences, member}) {

  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFoodData();
        setFoodData(data);
        setSelectedAllergies(member.allergies);
        setSelectedPreferences(member.preference);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  },[member.allergies, setSelectedAllergies, member.preference, setSelectedPreferences]);

  return (
      <>                            
        <Autocomplete
          multiple
          id="combo-box-demo"
          size="small"
          disableClearable
          options={foodData}
          filterOptions={filterOptions}
          groupBy={(option) => option.foodCategory}
          getOptionLabel ={({foodItem,id}) => {
            return `${id} - ${foodItem}`;
          }}
          getOptionDisabled={(options) => (selectedAllergies.length > 5 ? true : false)}
          filterSelectedOptions
          value={selectedAllergies.map(item => {
            const matchingOption = foodData.find(option => option.foodItem === item);
            return matchingOption || { foodItem: item };
          })}
          onChange={(event,value) => setSelectedAllergies(value.map(item => item.foodItem))}
          sx={{ width: '60vh'}}
          renderInput={(params) => <TextField {...params} label="Add Allergie Items"/>}
        />

        <div id="autoCompleteSpacer"></div>

        <Autocomplete
          multiple
          id="combo-box-demo"
          size="small"
          options={foodData}
          disableClearable
          filterOptions={filterOptions}
          groupBy={(option) => option.foodCategory}
          getOptionLabel ={({foodItem,id}) => {
            return `${id} - ${foodItem}`;
          }}
          getOptionDisabled={(options) => (selectedPreferences.length > 5 ? true : false)}
          filterSelectedOptions
          value={selectedPreferences.map(item => {
            const matchingOption = foodData.find(option => option.foodItem === item);
            return matchingOption || { foodItem: item };
          })}
          onChange={(event,value) => setSelectedPreferences(value.map(item => item.foodItem))}
          sx={{ width: '60vh'}}
          renderInput={(params) => <TextField {...params} label="Add Preference Items"/>}
        />
    </>
  );
}