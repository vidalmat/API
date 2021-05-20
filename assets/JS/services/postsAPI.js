import axios from "axios";


function findAll() {
    return axios
    .get('http://localhost:8000/api/allposts')
    .then(response => response.data['hydra:member']);
}

function deletePost(id){
    const token = window.localStorage.getItem("authToken");

    if(token) {
        axios.delete("http://localhost:8000/api/posts/" + id)
    }
}

function findOne(id) {
    if (id) {
        return axios
        .get("http://localhost:8000/api/post/" + id)
        .then(response => response.data);
    }
}

function newPost(post) {
    return axios
    .post("http://localhost:8000/api/posts", post)
    .then(response => response.data);
}

function editPost(id, post) {
    return axios
    .put("http://localhost:8000/api/posts/" + id, post)
    .then(response => response.data);
}

export default{
    findAll,
    findOne,
    deletePost,
    newPost,
    editPost
}