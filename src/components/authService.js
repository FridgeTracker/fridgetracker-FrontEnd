
export const authenticateUser = (userEmail) => {
    localStorage.setItem('userEmail', userEmail);
}

export const logoutUser = () => {
    localStorage.removeItem('userEmail');
}

export const getAuthToken = () => {
    return localStorage.getItem('userEmail');
}