import React from 'react';

export default function RenderError({ errorMessage }) {
  return <p className="error-message">⚠️ {errorMessage} ⚠️</p>;
}
