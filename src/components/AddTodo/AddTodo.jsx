import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/slices/todoSlice";
import axios from "axios";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    axios
      .post("http://localhost:4000/todos", { title })
      .then((response) => {
        dispatch(addTodo(response.data));
        setTitle("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default AddTodo;
