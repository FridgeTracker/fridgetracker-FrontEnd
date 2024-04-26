import { addItemRequest, deleteItemRequest, updateItemRequest } from "../Requests/postRequests";

const handleSave = async (event, Item, storageId, updateFridge) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);

    const savedItem = {
        itemID: Item.itemID,
        quantity: formData.get('quantity'),
        expiryDate: formData.get('expiryDate'),
        id: storageId // Set the id value here
    };

    try {
        const response = await updateItemRequest(savedItem);
        updateFridge(response);
      } 
      catch (error) {
        console.error('Failed to save data:', error);
    } 
}

const removeItemHandler = async (Item, storageId, updateFridge) => {
    const deleteItem = {
        itemID:Item.itemID,
        id: storageId 
    }

    try {
        const response = await deleteItemRequest(deleteItem);
        updateFridge(response);
      } 
      catch (error) {
        console.error('Failed to delete data:', error);
    } 
}

const handleSubmit = async (selectedItem, event, storageId, updateFridge) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    const itemToAdd = {
        foodName: selectedItem.foodItem,
        quantity: formData.get('quantity'),
        expiryDate: formData.get('expiryDate'),
        foodID: selectedItem.id,
        id: storageId
    };

    try {
        const response = await addItemRequest(itemToAdd);
        updateFridge(response);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } 
    };



const itemService = {
    handleSave,
    removeItemHandler,
    handleSubmit

}


export default itemService;