import React, { useEffect, useState } from 'react';
import userAPI from '../services/userAPI';

const UserPage = () => {

        const [posts, setPosts] = useState([]);
        const [user, setUser] = useState({});

        useEffect(async () => {
            try{
                await userAPI.findUser()
                .then(data => setUser(data))
                setLoading(false);

            }catch (error){

                error => console.log(error.response);
            }
    }, []);

    return ( 
    
    <> 
    
        <h1>Info Utilisateur</h1>

        <p className="h3 text-center">Bonjour {user.firstname} {user.lastname}, </p>
        <br/>
        <p className="h4 text-center mb-2">bienvenue sur votre espace personnel.
        <br/><br/>
        Vous totalisez { user.totalPost } articles sur le blog.
        
        </p>

    </>);
}
 
export default UserPage;