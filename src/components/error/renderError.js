import React from 'react';

export default function RenderError({ errorMessage, setErrorMessage }) {
  return <p className="error-message">⚠️ {errorMessage} ⚠️</p>;
}
