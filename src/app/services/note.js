import API from './api';

async function createNote (note) {
    const response = await API.post('/notes', note);
    return response;
}

export { createNote };