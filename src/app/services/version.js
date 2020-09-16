import createAxiosObject from './api';

const getVersions = (noteID, page) => {
    const API = createAxiosObject();
    return API.get(`notes/${noteID}/versions?page=${page}`);
}

const deleteVersion = (noteID, hash) => {
    const API = createAxiosObject();
    return API.delete(`notes/${noteID}/versions/${hash}`);
}
const revertToVersion = (noteID, hash) => {
    const API = createAxiosObject();
    return API.patch(`notes/${noteID}/versions/${hash}`);
}

export { getVersions, deleteVersion, revertToVersion };