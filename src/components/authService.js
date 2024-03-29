
export const authenticateUser = (UUID) => {
    localStorage.setItem('UUID', UUID);
}

export const logoutUser = () => {
    localStorage.removeItem('UUID');
}

export const getAuthToken = () => {
    return localStorage.getItem('UUID');
}