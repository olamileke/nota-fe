import API from './api';

async function createUser(user) {
    const response = await API.post('/users', user);
    return response;
}

async function authenticate(user) {
    const response = await API.post('/authenticate', user);
    return response;
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if(token) {
        return true;
    }

    return false;
}

export { createUser, authenticate, isAuthenticated };