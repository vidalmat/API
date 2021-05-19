import '../styles/app.css';

// Les imports des librairies
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Les imports de Bootstrap
import '../styles/bootstrap.min.css';
import './bootstrap.bundle.min.js';

// Les imports des composants ReactJs
import Navbar from './components/Navbar';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import PrivateRoute from './components/PrivateRoute';
import UserPage from './pages/UserPage';

AuthAPI.setUp()

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    // Permet de récupérer les props comme un composant Route standart
    const NavbarWithRouter = withRouter(Navbar);
    return ( 
        <HashRouter>

            <NavbarWithRouter isAuthenticated={isAuthenticated}
            onLogout={setIsAuthenticated}/>

                <Switch>

                    {/* { <Route path="/login"
                    render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props} /> }replace/> } */}

                    {/* <PrivateRoute path="/user/post/:id" setIsAuthenticated={setIsAuthenticated} component={NewPost} /> */}

                    <PrivateRoute path="/info/user" isAuthenticated={isAuthenticated} component={UserPage} />

                    {/* <Route path="/post/:id" component={OnePost} {...props}/> */}

                    <Route path="/posts" component={PostsPage}/>

                    <Route path="/login" 
                    render={(props) => <LoginPage onLogin=
                    {setIsAuthenticated} {...props} />}
                    replace
                    />

                    {/* <Route path="/register" component={RegisterPage}/> */}

                    <Route path="/" component={HomePage} replace/>

                </Switch>

        </HashRouter>   
    );
}

const root = document.querySelector("#root"); // Récupère l'id, écrire comme en css 
ReactDOM.render(<App />, root); // Récupérer le DOM et afficher notre composant react (app)