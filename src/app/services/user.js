import API from './api';

async function createUser(user) {
    return API.post('/users', user);
}

async function authenticate(user) {
    return API.post('/authenticate', user);
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if(token) {
        return true;
    }

    return false;
}

export { createUser, authenticate, isAuthenticated };