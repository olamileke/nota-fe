import API from './api';

const getVersions = (noteID, page) => {
    return API.get(`/notes/${noteID}/versions?page=${page}`);
}

const deleteVersion = (noteID, hash) => {
    return API.delete(`/notes/${noteID}/versions/${hash}`);
}

export { getVersions, deleteVersion };