import '../styles/app.css';

// Les imports des librairies
import React from 'react';
import ReactDOM from 'react-dom';

// Les imports de Bootstrap
import '../styles/bootstrap.min.css';
import './bootstrap.bundle.min.js';

// Les imports des composants ReactJs
import Navbar from './components/Navbar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';


const App = () => {
    return ( 
        <HashRouter>

            <Navbar/>

                <Switch>

                    {/* <Route path="/login"
                    render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props} /> }replace/> */}

                    {/* <PrivateRoute path="/user/post/:id" setIsAuthenticated={setIsAuthenticated} component={NewPost} /> */}

                    {/* <PrivateRoute path="/info/user" setIsAuthenticated={setIsAuthenticated} component={UserPage} /> */}

                    {/* <Route path="/post/:id" component={OnePost} {...props}/> */}

                    <Route path="/posts" component={PostsPage}/>

                    {/* <Route path="/register" component={RegisterPage}/> */}

                    <Route path="/" component={HomePage} replace/>

                </Switch>

        </HashRouter>   
    );
}

const root = document.querySelector("#root"); // Récupère l'id, écrire comme en css 
ReactDOM.render(<App />, root); // Récupérer le DOM et afficher notre composant react (app)