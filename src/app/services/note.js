import API from './api';

async function createNote (note) {
    const response = await API.post('/notes', note);
    return response;
}

async function getNotes(limit, page) {
    let url;
    if(limit) {
        url = `/notes?limit=${limit}`;
    }

    if(page) {
        url = `/notes?page=${page}`;
    }

    const response = await API.get(url);
    return response;
}

export { createNote, getNotes };