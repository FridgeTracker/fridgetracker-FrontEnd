import { getUser } from "../Requests/getRequest";
import { addStorageRequest } from "../Requests/postRequests";
import { getAuthToken } from "../authService";


const handleUpdateStorage = async (selectedStorage, setUserData, setselectedStorage, setItem, setAdd) => {
    try {
      const user_data = await getUser();
      setUserData(await getUser());
  
      if (selectedStorage) {
        const updatedStorage = user_data.fridges.find(storage => storage.id === selectedStorage.id) || user_data.freezers.find(storage => storage.id === selectedStorage.id);
        if (updatedStorage) {
          setselectedStorage(updatedStorage);
  
          const storageType = user_data.fridges.find(storage => storage.id === selectedStorage.id) ? "fridges" : "freezers";
          setUserData(userData => ({
            ...userData,
            [storageType]: userData[storageType].map(storage => ({
              ...storage,
              selected: storage.id === updatedStorage.id,
            })),
          }));
        }
      }
  
      setItem(null);
      setAdd(false);
    } 
    catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };


const storageHandler = (clickedStorage, selectedStorage, setselectedStorage, setUserData) => {

    if (!selectedStorage || selectedStorage.id !== clickedStorage.id) {
      setselectedStorage(clickedStorage);
  
      setUserData(prevUserData => ({
        ...prevUserData,
        fridges: prevUserData.fridges.map(fridge => ({
          ...fridge,
          selected: fridge.id === clickedStorage.id,
        })),
        freezers: prevUserData.freezers.map(freezer => ({
          ...freezer,
          selected: freezer.id === clickedStorage.id,
        })),
      }));
    }
  };

const handleAddStorage = async (formData, storageType, handleUpdateFridge) => {
    const addStorageData = {
        storageName: formData.get(storageType === "FRIDGE" ? "fridgeName" : "freezerName"),
        capacity: formData.get("capacity"),
        type:storageType,
        userID:getAuthToken()
    };

    try {
        await addStorageRequest(addStorageData);
        handleUpdateFridge();
    } catch (error) {
        console.error('Failed to save data:', error);
    }
};

export const storageService = {
    handleUpdateStorage,
    storageHandler,
    handleAddStorage
}