import API from './api';

async function createUser(user) {
    const response = await API.post('/users', user);
    return response;
}

export { createUser };