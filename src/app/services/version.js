import API from './api';

const getVersions = (noteID, page) => {
    return API.get(`/notes/${noteID}/versions?page=${page}`);
}

export { getVersions };