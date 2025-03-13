import React, { useState } from 'react';
import NutritionTab from './NutritionTab';
import MacroTab from './MacroTab';
import { Pie } from 'react-chartjs-2';
import SuggestionBox from './SuggestionBox';

//fake nutritionData
const nutritionData = [
  { nutritionName: 'Protein', userIntake: 50, recommendIntake: 56, unit: 'g' },
  {
    nutritionName: 'Carbohydrates',
    userIntake: 220,
    recommendIntake: 250,
    unit: 'g',
  },
  { nutritionName: 'Fats', userIntake: 70, recommendIntake: 77, unit: 'g' },
  { nutritionName: 'Fiber', userIntake: 25, recommendIntake: 30, unit: 'g' },
];

const ResultsContainer: React.FC = () => {
  const [view, setView] = useState<string>('macro'); // Set initial state to 'macro'

  return (
    <div>
      <div>
        <button onClick={() => setView('nutrition')}>Nutrition Tab</button>
        <button onClick={() => setView('macro')}>Macro Tab</button>
      </div>
      {view === 'nutrition' ? (
        <NutritionTab />
      ) : (
        <MacroTab nutritionData={nutritionData} />
      )}
      <SuggestionBox />
    </div>
  );
};

export default ResultsContainer;
