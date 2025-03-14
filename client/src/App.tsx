import React, {useState} from 'react';
import UploadImage from './components/UploadImage';
import FoodItemsList from './components/FoodItemsList';
import ResultsContainer from './components/ResultsContainer';
import './App.css';

export interface FoodItem {
  name: string;
  portion: string;
  unit: string;
}

export interface NutritionData {
  name: string;
  userIntake: number;
  recommendIntake: number;
  unit: string;
}



const App: React.FC = () => {
  const [food, setFood] = useState<FoodItem[]>([]);
  const [nutrition, setNutrition] = useState<NutritionData[]>([])

  const handleUpdateFood = (newFood:FoodItem[]) => {
    setFood(newFood)
  }

  const handleUpdateNutrition = (newNutrition:NutritionData[])=>{
    setNutrition(newNutrition)
  }

  return (
    <div className='app'>
      <h1>SnackSnap</h1>
      <UploadImage handleUpdateFood = {handleUpdateFood}/>
      <FoodItemsList food = {food} handleUpdateNutrition = {handleUpdateNutrition}/>
      <ResultsContainer nutrition = {nutrition}/>
    </div>
  );
};

export default App;
