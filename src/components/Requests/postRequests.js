import axios from "axios";
import { getUser, getUserRank } from "./getRequest";
import { authenticateUser, getAuthToken } from "../authService";

export const addStorageRequest = async (formData) => {
    try {
        const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/addStorage`,formData);
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


export const fillFridgeAndFreezer = async () => {
  try{
    const response = await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/uploadFridgeAndFreezer/${getAuthToken()}`);
    return response.data;
  } catch(error){
      console.error(error);
  }
}


export const updateNotificationsRequest = async (userAlerts) => {
  try{
    const response = await axios.post("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/updateNotifications",userAlerts);
    return response.data;
  } catch(error){
      console.error(error);
  }
}


export const registerUserRequest = async (formData) => {

  try{
    const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/register', formData);
    return response.data;
  }catch(error){
    return error.response.data;
  }

}


export const createListRequest = async (formData,setUser) => {

  try {
    await axios.post("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/create", formData);
    setUser(await getUser());
  } catch (error) {
      console.error('Error:', error.response.data); // Log response data
  }

}


export const deleteListRequest = async (formData,setUser,setSelectedList) => {
  try{
    axios.post("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteStorage",formData);
    const updatedUser = await getUser();
    setUser(updatedUser);
    setSelectedList(null);
  }catch(error){
    console.error(error);
  }

}



export const changeListRequest = async (formData,setUser) => {
  try {
    await axios.post("https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/changeListName", formData);
    const updatedUser = await getUser();
    setUser(updatedUser);
  } catch (error) {
    console.error(error);
  }
}


export const loginUserRequest = async (formData,navigate,setLoading) => {
  try {
    const response = await axios.post('https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/login', formData);  
    authenticateUser(response.data.id);
    await getUserRank(navigate);
  } 
  catch (error) {
      console.error('Login failed:', error);       
  } finally {
      setLoading(false);
  } 
}


export const deleteStorageRequest = async (deleteFridge, handleUpdateFridge) => {

  const formData = {
    type:deleteFridge.type,
    id:deleteFridge.id
  }

  try {

    await axios.post(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/deleteStorage`,formData);
    handleUpdateFridge();

  } 
  catch (error) {
    console.error('Failed to delete Storage:', error);
  } 

}

