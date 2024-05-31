import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../store/slices/todoSlice";

const EditTodo = ({ id, title, onSave }) => {
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateTodo({ id, title: newTitle }));
    onSave(id, newTitle);
  };

  return (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditTodo;
