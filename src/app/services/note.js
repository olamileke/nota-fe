import API from './api';

async function createNote (note) {
    return API.post('/notes', note);
}

async function getNotes(limit, page) {
    let url;
    if(limit) {
        url = `/notes?limit=${limit}`;
    }

    if(page) {
        url = `/notes?page=${page}`;
    }

    return API.get(url);
}

export { createNote, getNotes };