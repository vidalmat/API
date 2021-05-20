import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postsAPI from '../services/postsAPI';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');// ajoute une recherche sur le site 
    const handleSearch = ({ currentTarget }) => {         // variable pour créer la fonction pour le bloc recherche
        const value = currentTarget.value;
        setSearch(value);
    }

    // Variable pour que quand l'utilisateur met une majuscule ou non, la fonction passe la première en majuscule
    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

    useEffect(async () => {
        try{ 
            await postsAPI.findAll()
            .then(data => setPosts(data))

        } catch (error){
            error => console.log(error.response);
        }
        
    }, []);
    
    return ( 
    // Toujours penser à mettre des composants (<>, </>) sinon ça ne marchera pas
    <> 

    <input type="text"
        className="form-control p-2 form-control-lg"
        placeholder="Rechercher un onglet"
        onChange={handleSearch}
        value={search}

    />
    <div className='container'>
        <div className="row justify-content-between">
        {filteredPosts.map(post =>
        
                <div className='card text-white bg-secondary m-2 col-lg-3' key={post.id}>
                <div className="card text-white bg-primary mb-3" >

                    <div className="card-header">{ post.title }</div>
                    <div className="card-body">
                        <p>Posté le { moment.locale('fr'), moment(post.sentAt).format('Do MMMM YYYY à H:mm:ss')}</p>
                        <h3>{ post.author.pseudo }</h3>
                        <h4 className="card-title">Titre de l'article</h4>
                        <p className="card-text">Contenu de l'article{ post.content }</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link type="button" className="btn btn-info mb-3" to={`/post/${post.id}`}
                        >Voir le post</Link>

                    </div>
                    </div>
                </div> 
        )}
        </div>
    </div>
    </>
  );
}
 
export default PostsPage;