import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css'; 
import lightThemeIcon from './img/light.png'; 
import darkThemeIcon from './img/dark.png'; 
import addIcon from './img/add.png'; 
import completeIcon from './img/completeIcon.png';
import incompleteIcon from './img/incompleteIcon.png';
import editIcon from './img/edit.png'; 
import editHoverIcon from './img/editHover.png'; 
import deleteIcon from './img/delete.png'; 
import deleteHoverIcon from './img/deleteHover.png';
import emptyImageDark from './img/darkBackground.png';
import emptyImageLight from './img/lightBackground.png';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [currentEditIndex, setCurrentEditIndex] = useState(-1);
    const [noteInput, setNoteInput] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddTodo = () => {
        setCurrentEditIndex(-1); 
        setNoteInput('');
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setCurrentEditIndex(-1);
        setNoteInput('');
    };

    const handleSaveNote = () => {
        if (noteInput.trim() === '') return;

        if (currentEditIndex === -1) {
            setTodos([...todos, { text: noteInput, completed: false }]);
        } else {
            const updatedTodos = [...todos];
            updatedTodos[currentEditIndex].text = noteInput;
            setTodos(updatedTodos);
        }

        setNoteInput('');
        handleCloseModal();
    };

    const handleToggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    const handleEditTodo = (index) => {
        setCurrentEditIndex(index);
        setNoteInput(todos[index].text);
        setModalVisible(true);
    };

    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed' && !todo.completed) return false;
        if (filter === 'not-completed' && todo.completed) return false;
        return todo.text.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <h1 style={{ textAlign: 'center', color: darkMode ? 'white' : 'black' }}>TODO LIST</h1>
            <div className="container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search note..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ color: darkMode ? 'white' : 'black', backgroundColor: darkMode ? 'black' : 'white' }}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Complete</option>
                    <option value="not-completed">Incomplete</option>
                </select>
                <button onClick={handleThemeToggle} className="theme-toggle-button">
                    <img src={darkMode ? lightThemeIcon : darkThemeIcon} alt="Сменить тему" width="22" height="22" />
                </button>
            </div>

            <ul id="todo-list">
                {filteredTodos.map((todo, index) => (
                    <li className="todo-item" key={index}>
                        <div style={{ flex: '1' }}>
                            <button onClick={() => handleToggleComplete(index)}>
                                <img 
                                    src={todo.completed ? completeIcon : incompleteIcon} 
                                    alt={todo.completed ? 'Complete' : 'Incomplete'}
                                    width="24"
                                    height="24"
                                />
                            </button>
                            <span style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                marginLeft: '8px',
                                color: darkMode ? 'white' : 'black'
                            }}>
                                {todo.text}
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEditTodo(index)}
                                onMouseEnter={e => e.currentTarget.querySelector('img').src = editHoverIcon}
                                onMouseLeave={e => e.currentTarget.querySelector('img').src = editIcon}
                            >
                                <img src={editIcon} alt="Редактировать" width="18" height="18" />
                            </button>
                            <button
                                onClick={() => handleDeleteTodo(index)}
                                onMouseEnter={e => e.currentTarget.querySelector('img').src = deleteHoverIcon}
                                onMouseLeave={e => e.currentTarget.querySelector('img').src = deleteIcon}
                            >
                                <img src={deleteIcon} alt="Удалить" width="18" height="18" />
                            </button>
                        </div>
                    </li>
                ))}
                {filteredTodos.length === 0 && search && ( // Проверяем, если нет результатов поиска и строка поиска не пустая
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <img 
                            src={darkMode ? emptyImageDark : emptyImageLight} 
                            alt="No results" 
                            style={{ width: '221px', height: '174px' }} 
                        />
                        <p>EMPTY...</p>
                    </div>
                )}
            </ul>

            <button id="add-note-button" onClick={handleAddTodo}>
                <img src={addIcon} alt="Добавить заметку" width="24" height="24" />
            </button>

            {modalVisible && (
                <div id="modal">
                    <div className={`modal-content ${darkMode ? 'dark' : ''}`}>
                        <h1 style={{ color: darkMode ? 'white' : 'black' }}>{currentEditIndex === -1 ? 'NEW NOTE' : 'EDIT NOTE'}</h1>
                        <input
                            type="text"
                            className="note-input"
                            placeholder="Input your note..."
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            style={{ color: darkMode ? 'white' : 'black', backgroundColor: darkMode ? 'black' : 'white' }}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleCloseModal}>CANCEL</button>
                            <button onClick={handleSaveNote}>{currentEditIndex === -1 ? 'APPLY' : 'SAVE'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
