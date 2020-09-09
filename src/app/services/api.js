import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:4000/api/v1/",
    headers:localStorage.getItem('nota_token') ? { 'Content-Type':'application/json', 'Accepts':'application/json', 'Authorization':`Bearer ${localStorage.getItem('nota_token')}` } :
    { 'Content-Type':'application/json', 'Accepts':'application/json' }
})
