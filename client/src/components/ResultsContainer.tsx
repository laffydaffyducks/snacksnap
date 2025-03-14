import React, { useState } from 'react';
import NutritionTab from './NutritionTab';
import MacroTab from './MacroTab';
import SuggestionBox from './SuggestionBox';
import './ResultsContainer.css';

interface NutritionData {
  name: string;
  userIntake: number;
  recommendIntake: number;
  unit: string;
}

interface ResultsContainerProps {
  results: NutritionData[];
}


const ResultsContainer: React.FC<ResultsContainerProps> = ({results}) => {
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
      {view === 'nutrition' ? (
        <NutritionTab nutritionData={results} />
      ) : (
        <MacroTab nutritionData={results} />
      )}
      <SuggestionBox />
    </div>
  );
};

export default ResultsContainer;