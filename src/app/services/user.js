import createAxiosObject from './api';
import { notifySuccess } from './notify';

const createUser = user => {
    const API = createAxiosObject();
    return API.post('users', user);
}

const authenticate = user => {
    const API = createAxiosObject();
    return API.post('authenticate', user);
}

const updateAvatar = formData => {
    const API = createAxiosObject(true);
    return API.put('users', formData);
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

export { createUser, authenticate, updateAvatar, isAuthenticated, logout };