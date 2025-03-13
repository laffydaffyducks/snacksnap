import React from 'react';

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
  return (
    <div className='nutrition-tab-container'>
      <table>
        <thead>
          <tr>
            <th>Nutrition Name</th>
            <th>Your Intake</th>
            <th>% of Recommended Intake</th>
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
  );
};

export default NutritionTab;
