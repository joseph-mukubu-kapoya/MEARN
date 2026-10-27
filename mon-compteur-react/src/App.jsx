import React, { useState } from 'react';
import Header from './components/Header';
import Counter from './components/Counter';
import AutoTimer from './components/AutoTimer';
import './index.css';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <Header
        titre="Mon Super Compteur React"
        sousTitre="Maitrise des Hooks fondamentaux useState et useEffect"
      />

      <Counter />

      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <button
          className="btn btn-reset"
          onClick={() => setShowTimer(!showTimer)}
        >
          {showTimer ? 'Masquer le Chronometre' : 'Afficher le Chronometre'}
        </button>
      </div>

      {showTimer && <AutoTimer />}
    </div>
  );
}
