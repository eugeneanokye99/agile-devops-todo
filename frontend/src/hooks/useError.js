import { useState } from 'react';

export function useError() {
  const [error, setError] = useState(null);

  function handleError(err, customMessage = null) {
    const message = customMessage || err.message || 'An error occurred';
    setError(message);
    console.error('Error:', err);
  }

  function clearError() {
    setError(null);
  }

  return { error, handleError, clearError };
}
