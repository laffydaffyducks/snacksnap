import React, { useState } from 'react';
import PieChart from './PieChart';
import './MacroTab.css';

interface NutritionData {
  nutritionName: string;
  userIntake: number;
  recommendIntake: number;
  unit: string;
}

interface MacroTabProps {
  nutritionData: NutritionData[];
}

const MacroTab: React.FC<MacroTabProps> = ({ nutritionData }) => {
  const [macroData, setMacroData] = useState<boolean>(true);

  return (
    <div className='macro-tab-container'>
      {macroData ? (
        nutritionData.map((data, index) => (
          <div
            className={`nutrition-data-container ${
              index === 0 ? 'full-width' : ''
            }`}
            key={index}
          >
            <h3>{data.nutritionName}</h3>
            <PieChart
              nutritionName={data.nutritionName}
              userIntake={data.userIntake}
              recommendIntake={data.recommendIntake}
            />
          </div>
        ))
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
};

export default MacroTab;
