import axios from 'axios';

function register() {
    axios.post('http://127.0.0.1:5000/admin/register',  
        {"email": "test2@test.com", "password": "testpassword"}, 
        {headers: {'Content-Type': 'application/json'}}
).then(() => console.log("hello"))
}

function login() {
    axios.post('http://127.0.0.1:5000/admin/auth',  
    {"email": "test2@test.com", "password": "testpassword"}, 
    {headers: {'Content-Type': 'application/json'}}
).then(() => console.log("hello"))
}

export default {
    register,
    login
}