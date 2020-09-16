import createAxiosObject from './api';

async function getActivities(page) {
    const API = createAxiosObject();
    const response = await API.get(`/activities?page=${page}`);
    return response;
}

export { getActivities };