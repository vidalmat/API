import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postsAPI from '../services/postsAPI';
const NewPost = (props) => {

    const { id = "new "} = props.match.params;

    const [post, setPost] = useState({
        title: "",
        content: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        content: ""
    })

    const [editing, setEditing] = useState(false);

    const fetchPost = async id => {
        try {
            const data = await postsAPI.findOne(id);
            const { title, content} = data;

            setPost({ title, content});
        } catch (error){
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (id !== 'new') {
            setEditing(true)
            fetchPost(id)
        };
    }, [id])


    const handleChange = ({currentTarget}) => {
        const value = currentTarget.value;

        setPost({ ...post, [currentTarget.name]: value});
    }


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            if (editing) {
                await postsAPI.editPost(id, post);
            } else {
                await postsAPI.newPost(post)
            }
            props.history.replace("/info/user")
        } catch (error) {
            
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

    return ( <>
    
        { !editing && <h1 className='text-center'>Créer un Post</h1>
        || <h1 className='text-center'>Modifier un Post</h1> }
        <form onSubmit={handleSubmit}>
        <div className="form-group m-3">
            <label htmlFor='title'>Titre de l'article</label>
            <input
                onChange={handleChange}
                value={post.title}
                type='text'
                placeholder='Titre de la page'
                name='title'
                id='title'
                className={"form-control" + (errors.title && " is-invalid")} />
            {errors.title &&
                <p className="invalid-feddback">{ errors.title}</p>
            }
        </div>
        <div className="form-group m-3">
            <label htmlFor='content'>Contenu du post</label>
            <textarea
                onChange={handleChange}
                value={post.content}
                placeholder='Contenu du post'
                name='content'
                id='content'
                className={"form-control" + (errors.content && " is-invalid")} />
            {errors.content &&
                <p className="invalid-feddback">{ errors.content}</p>
            }
        </div>
        <div className="form-group m-3 d-flex justify-content-center">
            {!editing && <button type="submit" className="btn btn-success">Enregistrer</button>
                || <button type="submit" className="btn btn-info">Modifier</button> }
            <Link to="/info/user" className="btn btn-link">Retour</Link>
            
            
        </div>
        </form>
    
    </> );
}
 
export default NewPost;