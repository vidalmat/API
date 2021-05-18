import '../styles/app.css';

// Les imports des librairies
import React from 'react';
import ReactDOM from 'react-dom';

// Les imports de Bootstrap
import '../styles/bootstrap.min.css';
import './bootstrap.bundle.min.js';


const App = () => {
    return (<h1>Hello World</h1>);
}

const root = document.querySelector("#root"); // Récupère l'id, écrire comme en css 
ReactDOM.render(<App />, root); // Récupérer le DOM et afficher notre composant react (app)