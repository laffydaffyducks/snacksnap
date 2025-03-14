import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuggestionBox: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = {data: 'bro you eat too much'};
        setSuggestion(response.data);
      } catch (err) {
        setError('Failed to fetch suggestion');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Suggestion</h2>
      <p>{suggestion}</p>
    </div>
  );
};

export default SuggestionBox;