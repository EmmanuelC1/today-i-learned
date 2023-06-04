import React from 'react';
import { useState } from 'react';
import supabase from '../../database/supabase';
import ConfigData from '../../config/config.json';

export default function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

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
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
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
      <span className="post-date">6/3/23 8:14pm</span>

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
