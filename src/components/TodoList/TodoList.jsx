import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import EditTodo from "../EditTodo/EditTodo";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../store/slices/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/todos");
        dispatch(getTodos(response.data));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchTodos();
  }, [dispatch]);
  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, title) => {
    setEditingId(null);
    console.log(`${title}`);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onDoubleClick={() => handleEditClick(todo.id)}>
            {editingId === todo.id ? (
              <EditTodo id={todo.id} title={todo.title} onSave={handleSave} />
            ) : (
              todo.title
            )}
            <DeleteTodo id={todo.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
