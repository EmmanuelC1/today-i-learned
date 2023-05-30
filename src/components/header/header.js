import React from 'react';

export default function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" height="68" width="68" />
        <h1>Today I Learned</h1>
      </div>
      <button
        className="btn btn-large btn-share-fact"
        onClick={() => setShowForm(show => !show)}
      >
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}
