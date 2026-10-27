import React, { useState, useEffect } from 'react';

// Bornes limites (Defi 1)
const MIN = -50;
const MAX = 50;

export default function Counter() {
  // ── État ──────────────────────────────────────────────────────────────────
  // Initialisation depuis localStorage (Etape 5)
  const [count, setCount] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_valeur');
    return sauvegarde !== null ? parseInt(sauvegarde, 10) : 0;
  });

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);

  // Defi 2 : restauration historique depuis localStorage
  const [historique, setHistorique] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_historique');
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });

  const [alerteMax, setAlerteMax] = useState('');

  // ── Effets de bord ────────────────────────────────────────────────────────

  // EFFET A : Synchroniser le titre de l'onglet
  useEffect(() => {
    document.title = 'Compteur : ' + count;
  }, [count]);

  // EFFET B : Sauvegarde automatique de la valeur dans localStorage
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  // Defi 2 : Sauvegarde de l'historique
  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  // Defi 3 : Controle au clavier avec nettoyage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setCount((prev) => {
          if (prev + step > MAX) {
            setAlerteMax(`Seuil maximal de ${MAX} atteint !`);
            return prev;
          }
          setAlerteMax('');
          const nouveau = prev + step;
          setMessage('Ajout de ' + step + ' (clavier ↑)');
          setTotalClics((t) => t + 1);
          setHistorique((h) => [...h, '+' + step]);
          return nouveau;
        });
      } else if (e.key === 'ArrowDown') {
        setCount((prev) => {
          if (prev - step < MIN) {
            setAlerteMax(`Seuil minimal de ${MIN} atteint !`);
            return prev;
          }
          setAlerteMax('');
          const nouveau = prev - step;
          setMessage('Retrait de ' + step + ' (clavier ↓)');
          setTotalClics((t) => t + 1);
          setHistorique((h) => [...h, '-' + step]);
          return nouveau;
        });
      }
    };

    // Attachment de l'ecouteur global
    window.addEventListener('keydown', handleKeyDown);

    // IMPERATIF : fonction de nettoyage pour detacher l'ecouteur
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]); // Se relance si step change pour capturer la nouvelle valeur

  // ── Gestionnaires d'événements ────────────────────────────────────────────

  const handleIncrement = () => {
    // Defi 1 : seuil maximal
    if (count + step > MAX) {
      setAlerteMax(`Seuil maximal de ${MAX} atteint !`);
      return;
    }
    setAlerteMax('');
    const nouveauCompte = count + step;
    setCount(nouveauCompte);
    setMessage('Ajout de ' + step);
    setTotalClics(totalClics + 1);
    setHistorique([...historique, '+' + step]);
  };

  const handleDecrement = () => {
    // Defi 1 : seuil minimal
    if (count - step < MIN) {
      setAlerteMax(`Seuil minimal de ${MIN} atteint !`);
      return;
    }
    setAlerteMax('');
    const nouveauCompte = count - step;
    setCount(nouveauCompte);
    setMessage('Retrait de ' + step);
    setTotalClics(totalClics + 1);
    setHistorique([...historique, '-' + step]);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Remise a zero');
    setTotalClics(totalClics + 1);
    setHistorique([]);
    setAlerteMax('');
  };

  // ── Couleur dynamique ─────────────────────────────────────────────────────
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  // Defi 1 : boutons desactives aux bornes
  const incDisabled = count + step > MAX;
  const decDisabled = count - step < MIN;

  // ── Rendu JSX ─────────────────────────────────────────────────────────────
  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      {/* Defi 1 : message d'alerte visuelle */}
      {alerteMax && <p className="alerte">{alerteMax}</p>}

      <div className="btn-group">
        <button
          className="btn btn-dec"
          onClick={handleDecrement}
          disabled={decDisabled}
          title={decDisabled ? `Seuil minimal de ${MIN} atteint` : ''}
        >
          -{step}
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-inc"
          onClick={handleIncrement}
          disabled={incDisabled}
          title={incDisabled ? `Seuil maximal de ${MAX} atteint` : ''}
        >
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label>Pas d&apos;incrementation : </label>
        <select value={step} onChange={(e) => setStep(parseInt(e.target.value, 10))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p>
          <strong>Derniere action : </strong> {message}
        </p>
        <p>
          <strong>Total des clics : </strong> {totalClics}
        </p>
        {historique.length > 0 && (
          <p>
            <strong>Historique : </strong> {historique.join(', ')}
          </p>
        )}
        <p className="hint">💡 Utilisez ↑ / ↓ pour piloter au clavier</p>
      </div>
    </div>
  );
}
