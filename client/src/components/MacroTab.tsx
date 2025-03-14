import React from 'react';
import PieChart from './PieChart';
import './MacroTab.css';

interface NutritionData {
  name: string;
  userIntake: number;
  recommendIntake: number;
  unit: string;
}

interface MacroTabProps {
  nutritionData: NutritionData[] | null;
}

const MacroTab: React.FC<MacroTabProps> = ({ nutritionData }) => {
  if (!nutritionData) {
    return <div>No nutrition data available</div>;
  }

  return (
    <div className='macro-tab-container'>
      {nutritionData.slice(0, 4).map((data, index) => (
        <div
          className={`nutrition-data-container ${
            index === 0 ? 'full-width' : ''
          }`}
          key={index}
        >
          <h3 className='nutr-name'>{data.name}</h3>
          <PieChart
            name={data.name}
            userIntake={data.userIntake}
            recommendIntake={data.recommendIntake}
          />
        </div>
      ))}
    </div>
  );
};

export default MacroTab;
