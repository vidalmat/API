
import React from 'react';
const  Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                        <a className="navbar-brand" to="/">
                            Mon Blog
                        </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                        <a className="nav-link" to="/posts">Nos articles</a>
                        </li>
                    </ul>
                        <ul className="navbar-nav ml-auto">
                                    {/* Bouton connexion */}
                                    <li className="nav-item">
                                        <a to="/register" className="nav-link">Inscription</a>
                                    </li>
                                    <li className="nav-item">
                                        <a to="/login" className="btn btn-success">Connexion</a>
                                    </li>
                                    {/* Menu déroulant */ }
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gestion compte</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" to="/info/user">Mes informations</a>
                                        <a className="dropdown-item" to="/user/post/new">Nouveau post</a>
                                        <div className="dropdown-divider"></div>
                                        <button type="button"className="dropdown-item">Déconnexion</button>
                                    </div>
                                    </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}
 
export default Navbar;



