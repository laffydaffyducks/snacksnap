import React from 'react';
import PieChart from './PieChart';

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
  return (
    <div>
      {nutritionData.map((data, index) => (
        <div key={index}>
          <h3>{data.nutritionName}</h3>
          <PieChart
            nutritionName={data.nutritionName}
            userIntake={data.userIntake}
            recommendIntake={data.recommendIntake}
          />
        </div>
      ))}
    </div>
  );
};

export default MacroTab;
