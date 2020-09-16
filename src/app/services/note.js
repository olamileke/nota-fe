import createAxiosObject from './api';

function createNote(note) {
    const API = createAxiosObject();
    return API.post('notes', note);
}

function getNotes(limit, page) {
    let url;
    if(limit) {
        url = `notes?limit=${limit}`;
    }

    if(page) {
        url = `notes?page=${page}`;
    }

    const API = createAxiosObject();
    return API.get(url);
}

function updateNote(id, note) {
    const API = createAxiosObject();
    return API.put(`notes/${id}`, note);
}

function deleteNote(id) {
    const API = createAxiosObject();
    return API.delete(`notes/${id}`);
}

export { createNote, getNotes, updateNote, deleteNote };