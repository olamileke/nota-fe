import API from './api';
import { notifySuccess } from './notify';

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

const logout = () => {
    localStorage.clear();
    notifySuccess('logged out successfully');
}

export { createUser, authenticate, isAuthenticated, logout };