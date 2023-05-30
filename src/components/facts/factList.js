import React from 'react';
import Fact from './fact.js';

export default function FactList({ facts, setFacts }) {
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
      <p className="number-facts">
        There are {facts.length} facts in the database. Add your own!
      </p>
    </section>
  );
}
