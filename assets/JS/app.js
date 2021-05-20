import '../styles/app.css';

// Les imports des librairies
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Les imports de Bootstrap
import '../styles/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
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
import NewPost from './pages/NewPost';
import RegisterPage from './pages/RegisterPage';
import OnePost from './pages/OnePost';
import { toast, ToastContainer } from 'react-toastify';

AuthAPI.setUp()

const App = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    // Permet de récupérer les props comme un composant Route standart
    const NavbarWithRouter = withRouter(Navbar);
    return ( 
        <HashRouter>

            <NavbarWithRouter isAuthenticated={isAuthenticated}
            onLogout={setIsAuthenticated}/>

                <Switch>

                    <PrivateRoute path="/user/post/:id" isAuthenticated={isAuthenticated} component={NewPost} />

                    <PrivateRoute path="/info/user" isAuthenticated={isAuthenticated} component={UserPage} />

                    <Route path="/post/:id" component={OnePost} {...props}/>

                    <Route path="/posts" component={PostsPage}/>

                    <Route path="/login" 
                    render={(props) => <LoginPage onLogin=
                    {setIsAuthenticated} {...props} />}
                    replace
                    />

                    <Route path="/register" component={RegisterPage}/>

                    <Route path="/" component={HomePage} replace/>

                </Switch>
            <ToastContainer position={ toast.POSITION.BOTTOM_CENTER }/>
        </HashRouter>   
    );
}

const root = document.querySelector("#root"); // Récupère l'id, écrire comme en css 
ReactDOM.render(<App />, root); // Récupérer le DOM et afficher notre composant react (app)