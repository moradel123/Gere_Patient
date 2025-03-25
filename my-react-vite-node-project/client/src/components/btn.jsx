import React from 'react';
import { Link } from 'react-router-dom';
import './btn.css';

function Boutoun() {
  return (
    <div className="btn-wrapper">
      <button className="btn">
        &#8592; <Link to="../CreateCompt">Creer un compte</Link>
      </button>
      <button className="btn">
        <Link to="../Login">J'ai deja</Link> &#8594;
      </button>
    </div>
  );
}

export default Boutoun;