import { useEffect, useState } from 'react';

import fetchFacts from './utils/fetchFacts';
import './style.css';

import Header from './components/header/header.js';
import NewFactForm from './components/form/newFactForm';
import CategoryFilter from './components/categories/categoryFilter';
import Loading from './components/loading/loading';
import FactList from './components/facts/factList';
import RenderError from './components/error/renderError';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const getFacts = async () => {
      try {
        setIsLoading(true);

        // Fetch facts from Supabase DB by filtered bu the active category btn
        const data = await fetchFacts(currentCategory);
        // Update facts state if any facts fetched
        if (data) setFacts(data);
      } catch (err) {
        // setting error message in state to later render error component
        setErrorMessage(err.message);
      }
      setIsLoading(false);
    };
    getFacts();
  }, [currentCategory]);

  // Conditionally renders components (Loading, RenderError, FactList) based on state
  const renderComponent = () => {
    if (isLoading) {
      return <Loading />;
    } else if (errorMessage) {
      return <RenderError errorMessage={errorMessage} />;
    } else {
      return <FactList facts={facts} setFacts={setFacts} />;
    }
  };

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {renderComponent()}
      </main>
    </>
  );
}

export default App;
