import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/slices/todoSlice';

const DeleteTodo = ({ id }) => {
 const dispatch = useDispatch();

 const handleDelete = () => {
    // Отправка запроса на удаление задачи на сервер
    fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      dispatch(deleteTodo(id));
    })
    .catch(error => console.error('Ошибка при удалении задачи:', error));
 };

 return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTodo;
