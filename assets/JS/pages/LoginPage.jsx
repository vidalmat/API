import React, { useState } from 'react';
import { toast } from 'react-toastify';
import authAPI from '../services/authAPI';


const LoginPage = ({onLogin, history}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState('')

    //Récupération des champs input
    const handleChange = ({currentTarget}) => {

        const value = currentTarget.value;

        setCredentials({...credentials, [currentTarget.name]: value});
    }

    //fonction gérant les actions du submit
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await authAPI.authenticate(credentials);
            setError("");
            onLogin(true);
            toast.warning("Vous êtes connecté!! 🤪");
            history.replace("/");
        }
        catch (error){
            toast.success("Une erreur s'est produite!!! 👎");
            setError("Aucune adresse email ne correspond où alors les informations ne correspondent pas")

        }
    }

    return ( 

        <>
            <h1>Connexion</h1>
            
            <form onSubmit={handleSubmit}>
            <div className='form-group m-3'>
                <label htmlFor="username">Adresse mail</label>
            <input onChange={handleChange}
            value={credentials.username}
            type="email"
            placeholder="Adresse email"
            name="username"
            id="username"
            className={"form-control" + (error && " is-invalid")}/>
            {error &&
                <p className="invalid-feedback">{ error }</p>
            }
            </div>

            <div className='form-group m-3'>

                <label htmlFor="password">Mot de passe</label>
            <input 
            onChange={handleChange}
            value={credentials.password}
            type="password"
            placeholder="password"
            name="password"
            id="password"
            className="form-control"/>
            
            </div>
            <div className="form-group m-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success">Connexion</button>
            </div>
            </form>
            

        </>

     );
}
 
export default LoginPage;