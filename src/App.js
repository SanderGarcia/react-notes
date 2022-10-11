import React from 'react';
import './App.css';
import Note from './Note';

const App = () => {
  const [anotacoes, setAnotacoes] = React.useState([]);
  const [texto, setTexto] = React.useState('');

  React.useEffect(() => {
    const notasIniciais = [
      'Seja bem-vindo(a) à aplicação de anotações utilizando Reactjs. Essa aplicação não possui banco de dados então pode utilizar à vontade da forma que precisar. É também uma aplicação para constar em meu portfólio.',
      'As anotações são gravadas no localStorage do navegador. Portanto suas anotações só funcionarão nesse navegador e dispositivo que está utilizando nesse momento.',
    ];
    const notasStored = localStorage.getItem('anotacoes');
    if (notasStored === null) {
      localStorage.setItem('anotacoes', JSON.stringify(notasIniciais));
    }
    setAnotacoes(JSON.parse(localStorage.getItem('anotacoes')));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setAnotacoes([...anotacoes, texto]);
    setTexto('');
    localStorage.setItem('anotacoes', JSON.stringify([...anotacoes, texto]));
  }

  function excluir({ target }) {
    const resultado = window.confirm('Deseja excluir a anotação?');
    if (resultado) {
      const excluir = target.getAttribute('excluir');
      const novasAnotacoes = anotacoes.filter(
        (anotacao, index) => index != excluir,
      );
      setAnotacoes(novasAnotacoes);
      localStorage.setItem('anotacoes', JSON.stringify(novasAnotacoes));
    }
  }

  return (
    <>
      <header>
        <span>React Notes</span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://sandergarcia.github.io"
        >
          sandergarcia.github.io
        </a>
      </header>

      <div className="container">
        {anotacoes && <Note notas={anotacoes} onClick={excluir} />}
      </div>

      <footer>
        <form onSubmit={handleSubmit}>
          <input
            value={texto}
            id="description"
            placeholder="Descrição..."
            type="text"
            onChange={({ target }) => setTexto(target.value)}
            autoFocus
          />
          <button>+</button>
        </form>
      </footer>
    </>
  );
};

export default App;
