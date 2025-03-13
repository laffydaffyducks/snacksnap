import React, { useState } from 'react';
import NutritionTab from './NutritionTab';
import MacroTab from './MacroTab';
import { Pie } from 'react-chartjs-2';

const ResultsContainer: React.FC = () => {
  const [view, setView] = useState<string>('nutrition');

  return (
    <div>
      ResultsContainer
      {/* Put the nutrition + macro tabs here */}
      <NutritionTab />
      <MacroTab />
    </div>
  );
};

export default ResultsContainer;
