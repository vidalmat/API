import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postsAPI from '../services/postsAPI';
import userAPI from '../services/userAPI';

const UserPage = () => {

        const [posts, setPosts] = useState([]);
        const [user, setUser] = useState({});

        useEffect(async () => {
            try{
                await userAPI.findUser()
                .then(data => setUser(data))

            }catch (error){

                error => console.log(error.response);
            }
    }, []);

        useEffect(async () => {
            try{
                await userAPI.findAll()
                .then(data => setPosts(data))

            }catch (error){

                error => console.log(error.response);
            }
    }, []);

    const handleDelete = (id) => {

        // Suppression du post du côté Front de l'application
        setPosts(posts.filter(post => post.id != id));
        // Suppression du post côté Back de l'application 
        try{

            postsAPI.deletePost(id)
        } catch (error) {
            console.log(error.response);
        }
    }

    return ( 
    
    <> 
    
        <h1>Info Utilisateur</h1>

        <p className="h3 text-center">Bonjour {user.firstname} {user.lastname}, </p>
        <br/>
        <p className="h4 text-center mb-2">bienvenue sur votre espace personnel.
        <br/><br/>
        Vous totalisez { user.totalPost } articles sur le blog.
        
        </p>

        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Titre</th>
                <th scope="col">Date</th>
                <th scope="col">Bouton</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post =>
                <tr className="table-primary" key={post.id}>
                    <th scope="row">{ post.title }</th>
                    <td>Posté le { moment.locale("fr"), moment(post.sendAt).format('Do MMMM YYYY à H:mm:ss')}</td>
                    <td><Link to={`/user/post/${post.id}`} className='btn btn-info'>Edit</Link></td> 
                    <td><button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Supprimer</button></td>
                </tr>)}
            </tbody>
        </table>
    </>);
}
 
export default 
UserPage
;