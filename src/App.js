import { useEffect, useState } from 'react';
import ConfigData from './config/config.json';
import supabase from './database/supabase';
import './style.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    // Fetch facts from Supabase DB
    const getFacts = async () => {
      try {
        setIsLoading(true);

        let query = supabase.from('facts').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (error)
          throw new Error(
            `Failed to read from database: ${error.message}. ${error.hint}`
          );

        // Update facts state & setIsLoading to false
        setFacts(facts);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loading />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loading() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
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

const isValidHttpUrl = function (string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      // Validate data. If so, create new fact
      if (text && isValidHttpUrl(source) && category && textLength <= 200) {
        // Disable form inputs - avoids spamming
        setIsUploading(true);

        // Insert new row in Supabase DB and receive the new fact object
        const { data: newFact, error } = await supabase
          .from('facts')
          .insert([{ text, source, category }])
          .select();

        // Enable form inputs again
        setIsUploading(false);

        if (error)
          throw new Error(
            'Error uploading new fact to database. Please try again.'
          );

        // Add new fact to the UI (state)
        setFacts(facts => [...newFact, ...facts]);
      }

      // Close form
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={e => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {ConfigData.CATEGORIES.map(cat => (
          <option key={cat.name} value={cat.name}>
            {cat.name[0].toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li key="all" className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory('all')}
          >
            All
          </button>
        </li>

        {ConfigData.CATEGORIES.map(cat => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet. Share the first fact! 👆
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map(fact => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVote = async function (columnName) {
    try {
      // Disable voting button - avoids spamming
      setIsUpdating(true);

      const { data: updatedFact, error } = await supabase
        .from('facts')
        .update({ [columnName]: fact[columnName] + 1 })
        .eq('id', fact.id)
        .select();

      // Enable voting button
      setIsUpdating(false);

      if (error) throw new Error('Error updating vote');

      setFacts(facts =>
        facts.map(f => (f.id === fact.id ? updatedFact[0] : f))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: ConfigData.CATEGORIES.find(
            cat => cat.name === fact.category
          ).color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
