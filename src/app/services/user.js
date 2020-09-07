import API from './api';

async function createUser(user) {
    const response = await API.post('/users', user);
    return response;
}

async function authenticate(user) {
    const response = await API.post('/authenticate', user);
    return response;
}

export { createUser, authenticate };