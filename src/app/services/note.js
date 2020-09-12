import API from './api';

function createNote(note) {
    return API.post('/notes', note);
}

function getNotes(limit, page) {
    let url;
    if(limit) {
        url = `/notes?limit=${limit}`;
    }

    if(page) {
        url = `/notes?page=${page}`;
    }

    return API.get(url);
}

function updateNote(id, note) {
    return API.put(`/notes/${id}`, note);
}

function deleteNote(id) {
    return API.delete(`/notes/${id}`);
}

export { createNote, getNotes, updateNote, deleteNote };