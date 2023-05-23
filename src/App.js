import './style.css';

function App() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" height="68" width="68" />
        <h1>Today I Learned</h1>
      </div>
      <button className="btn btn-large btn-share-fact">Share a fact</button>
    </header>
  );
}

export default App;
