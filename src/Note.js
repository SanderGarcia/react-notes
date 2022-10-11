import React from 'react';

const Note = ({ notas, onClick }) => {
  return (
    <>
      {notas.map((note, index) => (
        <div className="note" key={index}>
          <button onClick={onClick} excluir={index}>
            &times;
          </button>
          <p>{note}</p>
        </div>
      ))}
    </>
  );
};

export default Note;
