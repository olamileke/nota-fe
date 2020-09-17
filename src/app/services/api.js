import axios from 'axios';
import { notifyError } from './notify';

const createAxiosObject = (multipart = false) => {
    let headers;

    if(multipart) {
        headers = {};
    }
    else {
        headers = { 'Content-Type':'application/json', 'Accepts':'application/json' };
    }

    if(localStorage.getItem('nota_token')) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('nota_token');
    }  

    const API = axios.create({
        baseURL:"http://localhost:4000/api/v1/",
        headers:headers
    })

    API.interceptors.response.use(response => response, error => {
        
        console.log(error.response);
        if(error.response.status.toString().startsWith('5') && !error.response.config.url.includes('activities')) {
            notifyError('an error occured');
        }
    
        throw(error);
    })

    return API;
}



export default createAxiosObject;
