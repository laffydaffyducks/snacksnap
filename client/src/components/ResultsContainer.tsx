import React, { useState } from 'react';
import NutritionTab from './NutritionTab';
import MacroTab from './MacroTab';
import SuggestionBox from './SuggestionBox';
import './ResultsContainer.css';
import {NutritionData} from '../App.tsx'

interface ResultsContainerProps {
  nutrition: NutritionData[];
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({nutrition}) => {
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
      {view === 'nutrition' ? (
        <NutritionTab nutritionData={nutrition} />
      ) : (
        <MacroTab nutritionData={nutrition} />
      )}
      <SuggestionBox nutrition = {nutrition}/>
    </div>
  );
};

export default ResultsContainer;