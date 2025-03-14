import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';
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
  recommendIntake: number,
  isOverIntake: boolean
  recommendIntake: number,
  isOverIntake: boolean
) => {
  let data;
  if (userIntake > recommendIntake) {
    data = {
      labels: ['Excess Intake', 'Recommended Intake'],
      datasets: [
        {
          label: nutritionName,
          data: [userIntake - recommendIntake, recommendIntake],
          backgroundColor: ['red', 'green'],
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
          backgroundColor: ['green', 'grey'],
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

  const [isOverIntake, setIsOverIntake] = useState<boolean>(false);

  useEffect(() => {
    setIsOverIntake(userIntake > recommendIntake);
  }, [recommendIntake, userIntake]);

  return (
    <div>
      <Pie data={handleInput(name, userIntake, recommendIntake)} />
      <h3>
        Your Intake / Recommended Intake: {`${userIntake}/${recommendIntake}`}
      </p>
      </p>
    </div>
  );
};

export default PieChart;