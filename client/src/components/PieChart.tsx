import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip);

interface PieChartProps {
  name: string;
  userIntake: number;
  recommendIntake: number;
}

const handleInput = (
  nutritionName: string,
  userIntake: number,
  recommendIntake: number
) => {
  let data;
  if (userIntake > recommendIntake) {
    data = {
      labels: ['Excess Intake', 'Recommended Intake'],
      datasets: [
        {
          label: nutritionName,
          data: [userIntake - recommendIntake, recommendIntake],
          backgroundColor: ['#942525ef', '#1b541b'],
          borderColor: ['#942525ef', '#1b541b'],
          hoverOffset: 4,
        },
      ],
    };
  } else {
    data = {
      labels: ['User Intake', 'Remaining Intake'],
      datasets: [
        {
          label: nutritionName,
          data: [userIntake, recommendIntake - userIntake],
          backgroundColor: ['#1b541b', 'grey'],
          borderColor: ['#1b541b', 'grey'],
          hoverOffset: 4,
        },
      ],
    };
  }
  return data;
};

const PieChart: React.FC<PieChartProps> = ({
  name,
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
        <Pie data={handleInput(name, userIntake, recommendIntake)} />
      </div>
      <p className='intake'>
        Your Intake / Recommended Intake:{' '}
        {`${Math.floor(userIntake)}/${recommendIntake}`}
      </p>
    </div>
  );
};

export default PieChart;
