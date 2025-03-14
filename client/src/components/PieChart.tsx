import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip);

interface PieChartProps {
  nutritionName: string;
  userIntake: number;
  recommendIntake: number;
}

const handleInput = (
  nutritionName: string,
  userIntake: number,
  recommendIntake: number,
  isOverIntake: boolean
) => {
  const data = {
    labels: [
      'Your Intake Amount',
      isOverIntake ? 'Over Intake Amount' : 'Remaining Amount',
    ],
    datasets: [
      {
        label: nutritionName,
        data: [
          userIntake,
          isOverIntake
            ? Math.abs(recommendIntake - userIntake)
            : recommendIntake - userIntake,
        ],
        backgroundColor: ['#1b541b', isOverIntake ? '#942525ef' : 'grey'],
        borderColor: ['#1b541b', isOverIntake ? '#942525ef' : 'grey'],
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
  const [isOverIntake, setIsOverIntake] = useState<boolean>(false);

  useEffect(() => {
    setIsOverIntake(userIntake > recommendIntake);
  }, [recommendIntake, userIntake]);

  return (
    <div className='piechart-container'>
      <div className='piechart'>
        <Pie
          data={handleInput(
            nutritionName,
            userIntake,
            recommendIntake,
            isOverIntake
          )}
        />
      </div>
      <p className='intake'>
        Your Intake / Recommended Intake: {`${userIntake}/${recommendIntake}`}
      </p>
    </div>
  );
};

export default PieChart;
