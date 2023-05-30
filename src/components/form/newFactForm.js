import React from 'react';
import { useState } from 'react';

import supabase from '../../database/supabase';
import ConfigData from '../../config/config.json';
import isValidHttpUrl from '../../utils/validateHttpUrl';

export default function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      // Close form
      setShowForm(false);

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
            `Error uploading new fact to database. ${error.message}. ${error.hint}`
          );

        // Add new fact to the UI (state)
        setFacts(facts => [...newFact, ...facts]);
      } else {
        throw new Error(
          `Error with input format. All fields are required. Double check that source URL includes full path (e.g. 'https://google.com')`
        );
      }
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
