import React, { useState } from 'react';
import './NutritionTab.css';

interface NutritionData {
  nutritionName: string;
  userIntake: number;
  recommendIntake: number;
  unit: string;
}

interface NutritionTabProps {
  nutritionData: NutritionData[];
}

const NutritionTab: React.FC<NutritionTabProps> = ({ nutritionData }) => {
  const [nutrData, setNutrData] = useState<boolean>(true);

  return nutrData ? (
    <div className='nutrition-tab-container'>
      <table className='nutrition-table'>
        <thead>
          <tr>
            <th className='nutr-table-head'>Nutrition Name</th>
            <th className='nutr-table-head'>Your Intake</th>
            <th className='nutr-table-head'>% of Recommended Intake</th>
          </tr>
        </thead>
        <tbody>
          {nutritionData.map((data, index) => {
            const percentageIntake = Math.floor(
              (data.userIntake / data.recommendIntake) * 100
            );
            return (
              <tr key={index}>
                <td>{data.nutritionName}</td>
                <td>{data.userIntake}</td>
                <td>{percentageIntake}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No data yet</p>
  );
};

export default NutritionTab;
