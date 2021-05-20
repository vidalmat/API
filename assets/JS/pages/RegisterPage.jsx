import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../services/userAPI';
const RegisterPage = (props) => {

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        pseudo: "",
        email: "",
        password: ""
    })
    
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        pseudo: "",
        email: "",
        password: ""
    })

    //Récupération des champs input
    const handleChange = ({currentTarget}) => {

        const value = currentTarget.value;

        setUser({...user, [currentTarget.name]: value});
    }
    

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await userAPI.newUser(user);
            // toast.sucess("Votre inscription a réussie")
            props.history.replace('/login');
        } catch (error) {
            // toast.error("Oups, une erreur vient de ce produire")
            
            // console.log(error.response.data);
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.
                    message
                });

                setErrors(apiErrors);
            }
        }
    }

    
    return ( 
    <>
    
    <h1>Page d'enregistrement</h1>
    
    
    <form onSubmit={handleSubmit}>
    <div className='form-group m-3'>
        <label htmlFor="text">Pseudo</label>
        <input 
            onChange={handleChange}
            value={user.pseudo}
            type="text"
            placeholder="pseudo"
            name="pseudo"
            id="pseudo"
            className={"form-control" + (errors.pseudo && " is-invalid")}/>
        {errors.pseudo &&
        <p className="invalid-feedback">{ errors.pseudo }</p>
        }
    </div>

    <div className='form-group m-3'>
        <label htmlFor="text">Nom</label>
        <input 
            onChange={handleChange}
            value={user.firstname}
            type="text"
            placeholder="nom"
            name="firstname"
            id="firstname"
            className={"form-control" + (errors.firstname && " is-invalid")}/>
        {errors.firstname &&
        <p className="invalid-feedback">{ errors.firstname }</p>
        }
    </div>

    <div className='form-group m-3'>
        <label htmlFor="text">Prénom</label>
        <input 
            onChange={handleChange}
            value={user.lastname}
            type="text"
            placeholder="prénom"
            name="lastname"
            id="lastname"
            className={"form-control" + (errors.pseudo && " is-invalid")}/>
        {errors.pseudo &&
        <p className="invalid-feedback">{ errors.pseudo }</p>
        }
    </div>
    
    <div className='form-group m-3'>
            <label htmlFor="email">Adresse mail</label>
        <input onChange={handleChange}
            value={user.email}
            type="email"
            placeholder="Adresse email"
            name="email"
            id="email"
            className={"form-control" + (errors.email && " is-invalid")}/>
        {errors.email &&
        <p className="invalid-feedback">{ errors.email }</p>
        }
    </div>

    <div className='form-group m-3'>
        <label htmlFor="password">Mot de passe</label>
        <input 
            onChange={handleChange}
            value={user.password}
            type="password"
            placeholder="password"
            name="password"
            id="password"
            className={"form-control" + (errors.password && " is-invalid")}/>
        {errors.password &&
        <p className="invalid-feedback">{ errors.password }</p>
        }
    </div>
    
    <div className="form-group m-3 d-flex justify-content-center">
        <button type="submit" className="btn btn-success">Enregistrer</button>
        <Link to="/" className="btn btn-link">Retour</Link>
    </div>
    </form>

    </>
     );
}
 
export default RegisterPage;