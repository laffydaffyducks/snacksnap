import React, { useState } from 'react';
import NutritionTab from './NutritionTab';
import MacroTab from './MacroTab';
import SuggestionBox from './SuggestionBox';
import './ResultsContainer.css';

//fake nutritionData
const nutritionData = [
  { nutritionName: 'Protein', userIntake: 80, recommendIntake: 56, unit: 'g' },
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
    <div className='results-container'>
      <div className='results-tabs-container'>
        <button
          className={view === 'nutrition' ? 'active-tab' : ''}
          onClick={() => setView('nutrition')}
        >
          Nutrition
        </button>
        <button
          className={view === 'macro' ? 'active-tab' : ''}
          onClick={() => setView('macro')}
        >
          Macro
        </button>
      </div>
      <div className='component-transition'>
        {view === 'nutrition' ? (
          <NutritionTab nutritionData={nutritionData} />
        ) : (
          <MacroTab nutritionData={nutritionData} />
        )}
      </div>
      <SuggestionBox />
    </div>
  );
};

export default ResultsContainer;
