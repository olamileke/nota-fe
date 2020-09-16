import axios from 'axios';

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

    return axios.create({
        baseURL:"http://localhost:4000/api/v1/",
        headers:headers
    })
}

export default createAxiosObject;
