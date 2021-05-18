import React from 'react';

const PostsPage = () => {
    return ( 
    // Toujours penser à mettre des composants (<>, </>) sinon ça ne marchera pas
    <> 
        <div className="card text-white bg-primary mb-3">
        <div className="card-header">Articles</div>
        <div className="card-body">
            <h3>Auteur</h3>
            <h4 className="card-title">Titre de l'article</h4>
            <p className="card-text">Contenu de l'article</p>
        </div>
        </div> 
    </>
  );
}
 
export default PostsPage;