import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

interface PieChartProps {
  nutritionName: string;
  userIntake: number;
  recommendIntake: number;
}

const handleInput = (
  nutritionName: string,
  userIntake: number,
  recommendIntake: number
) => {
  const data = {
    labels: ['Green', 'Grey'],
    datasets: [
      {
        label: nutritionName,
        data: [userIntake, recommendIntake - userIntake],
        backgroundColor: ['green', 'grey'],
        hoverOffset: 4,
      },
    ],
  };
  return data;
};

const PieChart: React.FC<PieChartProps> = ({
  nutritionName,
  userIntake,
  recommendIntake,
}) => {
  return (
    <div>
      <Pie data={handleInput(nutritionName, userIntake, recommendIntake)} />
      <h3>
        Your Intake / Recommended Intake: {`${userIntake}/${recommendIntake}`}
      </h3>
    </div>
  );
};

export default PieChart;
