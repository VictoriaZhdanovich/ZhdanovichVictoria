import React from 'react';

const TodoList = ({ todos, filter, search, onToggleComplete, onEdit, onDelete }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed' && !todo.completed) return false;
    if (filter === 'not-completed' && todo.completed) return false;
    return todo.text.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ul id="todo-list">
      {filteredTodos.map((todo, index) => (
        <li key={index} className="todo-item">
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
          <div>
            <button onClick={() => onToggleComplete(index)}>{todo.completed ? 'Не выполнено' : 'Выполнено'}</button>
            <button onClick={() => onEdit(index)}>Редактировать</button>
            <button onClick={() => onDelete(index)}>Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
