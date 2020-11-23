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

const checkValidEmail = data => {
    const API = createAxiosObject();
    return API.post('/resets', data);
}

const checkActivationToken = data => {
    const API = createAxiosObject();
    return API.patch(`/users`, data);
}

const checkPasswordResetToken = token => {
    const API = createAxiosObject();
    return API.get(`/resets/${token}`);
}

const changePassword = (token, data) => {
    const API = createAxiosObject();
    return API.put(`/resets/${token}`, data);
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

export { createUser, authenticate, updateAvatar, checkValidEmail, checkActivationToken,
checkPasswordResetToken, changePassword, isAuthenticated, logout };