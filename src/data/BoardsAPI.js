import axios from 'axios';

function register(email, password) {
    return axios.post('http://127.0.0.1:5000/admin/register',  
        {"email": email, "password": password}, 
        {headers: {'Content-Type': 'application/json'}});
}

function login(email, password) {
    axios.post('http://127.0.0.1:5000/admin/auth',  
    {"email": email, "password": password}, 
    {headers: {'Content-Type': 'application/json'}}
).then(() => console.log("hello"))
}

export default {
    register,
    login
}