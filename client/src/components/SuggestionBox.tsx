import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NutritionData } from '../App.tsx';

interface GetSuggestionProps {
  nutrition: NutritionData[];
}

const SuggestionBox: React.FC<GetSuggestionProps> = ({ nutrition }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = await axios.post('http://localhost:3000/suggestion', {
          items: nutrition,
        });
        console.log('❤️response from suggestion', response.data);
        setSuggestion(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching suggestion:', err);
        setError('Failed to fetch suggestion');
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [nutrition]);

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