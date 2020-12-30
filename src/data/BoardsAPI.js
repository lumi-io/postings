import axios from 'axios';

function register(email, password) {
    return axios.post('http://127.0.0.1:5000/admin/register',  
        {"email": email, "password": password}, 
        {headers: {'Content-Type': 'application/json'}});
}

function login(email, password) {
    return axios.post('http://127.0.0.1:5000/admin/auth',  
    {"email": email, "password": password}, 
    {headers: {'Content-Type': 'application/json'}});
}

function refreshToken() {
    return axios.post('http://127.0.0.1:5000/admin/refresh', 
    {headers: {"Authorization": `Bearer ${localStorage.getItem("refresh")}`}});
}

function tokenAuthorization() {
    return axios.get('http://127.0.0.1:5000/persons', {'search': 1})
}

export default {
    register,
    login,
    refreshToken,
    tokenAuthorization,
}