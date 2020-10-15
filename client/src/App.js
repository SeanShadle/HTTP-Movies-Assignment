import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = (id, data) => {
    const tempData = { ...data, stars: data.stars.split(", ") };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, tempData)
      .then(res => {
        const tempList = [...movieList];
        tempList.splice(
          movieList.findIndex(movie => movie.id == id),
          1,
          res.data
        );
        setMovieList(tempList);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  const addMovie = (data) => {
    const newMovie = {...data, stars: data.stars.split(", ")};
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then(res => {
        const tempList = [...movieList];
        tempList.push(newMovie)
        setMovieList(tempList);
        history.push('/');
      })
      .catch(err => console.log(err));
  };

    const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovieList(movieList.filter(movie => {
          return movie.id !== res.data
        }))
        history.push("/");
      })
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie updateMovie = {updateMovie} />
      </Route>

      <Route path="/add-movie">
        <AddMovie addMovie = {addMovie} />
      </Route>
    </>
  );
};

export default App;
