import { getUser } from "../Requests/getRequest";
import { addMemberRequest, deleteMemberRequest, updateMemberRequest } from "../Requests/postRequests";
import { getAuthToken } from "../authService";

const handleUpdateMember = async (setUserData, selectedMember, setSelectedMember) => {
    try {
      const user_Data = await getUser();
      setUserData(user_Data);
      const updatedSelectedMember = user_Data.members.find(member => member.id === selectedMember.id);
     
      if (updatedSelectedMember) {
          setSelectedMember(updatedSelectedMember);
      }

    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

const handleAddMember = async (event, setAddMember, setUserData) => {
    event.preventDefault(); 
    setAddMember(false);

    const formData = new FormData(event.target);
    const addMember = {
        member: {
            name: formData.get("memberName"),
            age: 20,
            allergies: [],
            preference: [],
            height: 170,
            weight: 60,
            imageURL: 'ftlogo.png'
        },
        userID: getAuthToken()
    };

    try {
        setUserData(await addMemberRequest(addMember));
        } 
    catch (error) {
        console.error('Failed to Add new Member:', error);
    } 
}

  const deleteMember = async (member,setUserData,setSelectedMember) => {
 
    try{
      await deleteMemberRequest(member);
      setUserData(await getUser());
      setSelectedMember(null);
    } 
    catch(error) {
      console.error(error);
    }
  }

const handleFormSubmit = async (formData, member, updateMember, setMesage) => {

    const newData = ({
        member : {...formData,id:member.id},
        userID: getAuthToken()
    });
    const response = await updateMemberRequest(newData);

    if(response === "Member updated successfully"){
        updateMember();
        setMesage(response);
    }else{
        setMesage(response);
    }
};


const memberService = {
    handleUpdateMember,
    handleAddMember,
    deleteMember,
    handleFormSubmit
}

export default memberService;