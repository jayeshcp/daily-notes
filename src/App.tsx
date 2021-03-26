import React from 'react';
import logo from './logo.svg';
import './App.css';

interface User {
  name: string;
  email: string
}

function App() {
  const user: User = { name: 'James', email: 'james@gmail.com' };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
