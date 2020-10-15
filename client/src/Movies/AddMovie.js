import React,{useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const AddMovie = (props) => {
    const [item, setItem] = useState(initialState);

    const handleChanges = e => {
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        });
    };

    const {id} = useParams();
    const {push} = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        props.addMovie(item)
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem({...res.data, stars: res.data.stars.join(", ")});
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={handleChanges}
                placeHolder="Title"
                value={item.title}
            />
            <div className="baseline" />

            <input 
                type="text"
                name="director"
                onChange={handleChanges}
                placeHolder="Director"
                value={item.director}
            />
            <div className="baseline" />

            <input 
                type="number"
                name="metascore"
                onChange={handleChanges}
                placeHolder="Metascore"
                value={item.metascore}
            />
            <div className="baseline" />

            <input 
                type="text"
                name="stars"
                onChange={handleChanges}
                placeHolder="Stars"
                value={item.stars}
            />
            <div className="baseline" />

            <button>Add Movie</button>
        </form>
    </div>
    )
}

export default AddMovie;