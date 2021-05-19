import axios from 'axios';
import jwtDecode from 'jwt-decode';

function findUser() {

    const token = window.localStorage.getItem('authToken');

    if(token) {
        const jwtData = jwtDecode(token);

        const id = jwtData.id;

        return axios 
        .get("http://localhost:8000/api/users/" + id)
        .then(response => response.data);
    }
}

export default{
    findUser
}