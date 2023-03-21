import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addTodo } from '../redux/slice';

const TodoList = () => {
  const [inputText, setInputText] = useState('');
  const todoList = useSelector((state) => state.todoList);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    addTodo(inputText);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={inputText}
        onChange={handleInputChange}
        label="todo"
        placeholder="Ej. Go to Supermarket"
      />
      <button onClick={handleButtonClick} label="submit">
        Add Todo
      </button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
