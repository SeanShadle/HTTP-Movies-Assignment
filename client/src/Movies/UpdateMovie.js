import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [item, setItem] = useState(initialItem);

  const handleChanges = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/update-movie/${id}`).then((res) => {
      setItem(res.data);
    });
  },[id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        props.setItem(res.data);
        push(`movie-list/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="title"
          value={item.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={item.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={handleChanges}
          placeholder="metascore"
          value={item.title}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChanges}
          placeholder="stars"
          value={item.title}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
