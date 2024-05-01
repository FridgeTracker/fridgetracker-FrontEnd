import { getUser } from "../Requests/getRequest";
import { addItemRequest, addStorageRequest, deleteItemRequest, updateItemRequest } from "../Requests/postRequests";
import { getAuthToken } from "../authService";

const createShoppingList = async (setUser,user) => {

    const formData = {
      storageName:"New List 1",
      quantity:0,
      userID:getAuthToken()
    };
    if(user.shoppingLists.length < 8){
      await addStorageRequest(formData,setUser);
    }

}

const addListItem = async (selectedList, setUser, setSelectedList) => {

    const itemToAdd = {
        foodName: "Food Name",
        quantity: 0,
        id: selectedList.id // Set the id value here
    };

    try {
        // Send request to add item
        await addItemRequest(itemToAdd);

        // Update user data
        const updatedUser = await getUser();
        setUser(updatedUser);

        // No need to find and set selectedList again
        setSelectedList(updatedUser.shoppingLists.find(list => list.id === selectedList.id));
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    } 
};

const saveNewList = async (editMode, selectedList, setUser, setSelectedList) => {

    const savedItem = {

      foodName:editMode.foodName,
      itemID: editMode.itemID,
      quantity: editMode.quantity,
      id: selectedList.id // Set the id value here

  };

    try {
          await updateItemRequest(savedItem);
          const updatedUser = await getUser();
          setUser(updatedUser);
          setSelectedList(updatedUser.shoppingLists.find(list => list.id === selectedList.id));
      } 
      catch (error) {
          console.error('Error:', error.response.data); // Log response data
      }
  }

  const deleteItem = async (deletedSelection, selectedList, setUser, setSelectedList) => {

    const deleteItem = {
      itemID:deletedSelection.itemID,
      id: selectedList.id
    }

    try {
      await deleteItemRequest(deleteItem);
      const updatedUser = await getUser();
      setUser(updatedUser);
      setSelectedList(updatedUser.shoppingLists.find(list => list.id === selectedList.id));
    } 
    catch (error) {
      console.error('Failed to delete data:', error);
    } 
  }


const shoppingListService = {
    createShoppingList,
    addListItem,
    saveNewList,
    deleteItem
}

export default shoppingListService;