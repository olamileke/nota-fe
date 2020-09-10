import API from './api';

async function getActivities(page) {
    const response = await API.get(`/activities?page=${page}`);
    return response;
}

export { getActivities };