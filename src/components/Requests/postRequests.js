import axios from "axios";
import { getUser } from "./getRequest";

export const addFreezerRequest = async (formData) => {
    try {
        const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addFreezer`,formData);
        return response.data;
      } catch (error) {
        console.error('Failed to save data:', error);
      } 
}

export const addFridgeRequest = async (formData) => {
    try {
        const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addFridge`,formData);
        return response.data;
      } catch (error) {
        console.error('Failed to save data:', error);
      } 
}

export const addItemRequest = async (formData) => {
    try {
        await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addItem`,formData);
        return formData.id;
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } 
}


export const deleteItemRequest = async (formData) => {
    try {
        await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteItem`,formData);
        return formData.id;
      } catch (error) {
        console.error('Failed to delete data:', error);
    } 
}


export const updateItemRequest = async (formData) => {
    try {
        await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateItem`,formData);
        return formData.id;
      } catch (error) {
        console.error('Failed to save data:', error);
    } 
}


export const addMemberRequest = async (formData) => {
    try {
        await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addMember`,formData);    
        return await getUser();
      } catch (error) {
        console.error('Failed to Add new Member:', error);
      } 
}


export const updateMemberRequest = async (formData) => {
    try {
        const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateMember`,formData);    
        return response.data;
      } catch (error) {
        console.error('Failed to Add new Member:', error);
      } 
}


export const changePasswordRequest = async (formData) => {
    try {
        const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/changePw', formData);
        return response.data;
    } catch (error) {
        console.error('Failed to update Password:', error);
        return 'Failed to update Password';
    }
}

export const updateUserRequest = async (formData) => {
    try {         
        const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateUser', formData);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update information:', error);
        return "User failed to update";
    }
}


export const deleteMemberRequest = async (formData) => {
  try {         
      const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteMember', formData);
      return response.data;
  }
  catch (error) {
      console.error('Failed to delete Member:', error);
      return "Failed to delete member";
  }
}