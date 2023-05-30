import { useEffect, useState } from 'react';

import fetchFacts from './utils/fetchFacts';
import './style.css';

import Header from './components/header/header.js';
import NewFactForm from './components/form/newFactForm';
import CategoryFilter from './components/categories/categoryFilter';
import Loading from './components/loading/loading';
import FactList from './components/facts/factList';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    const getFacts = async function () {
      try {
        setIsLoading(true);

        // Fetch facts from Supabase DB by filtered bu the active category btn
        const data = await fetchFacts(currentCategory);

        // Update facts state if any facts fetched
        if (data) setFacts(data);

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

export default App;
