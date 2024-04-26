import axios from "axios";
import { getAuthToken } from "../authService";

export const getUser = async () => {

    try{
        const token = getAuthToken();
        const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${token}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

export const getUsers = async () => {
    try{
        const response = await axios.get("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getUsers");
        return response.data;
    } catch(error){
        console.log(error);
    }
}


export const getFoodData = async () => {
    try {
        const response = await axios.get('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getFoodData');
        return response.data;
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
}

export const getAlerts = async () => {
    try {
        const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/getAlerts/${getAuthToken()}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
}


export const getUserRank = async () => {
    try{
        const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${getAuthToken()}`);
        return response.data.rank;
      }catch(error){
        console.error(error);
      }
}