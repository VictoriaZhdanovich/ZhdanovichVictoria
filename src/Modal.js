import React from 'react';

const Modal = ({ isOpen, onClose, onSave, noteText }) => {
  if (!isOpen) return null;

  return (
    <div id="modal">
      <div className="modal-content">
        <h2>NEW NOTE</h2>
        <input type="text" id="note-input" defaultValue={noteText} />
        <button id="save-note" onClick={onSave}>Добавить</button>
        <button id="close-modal" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;
