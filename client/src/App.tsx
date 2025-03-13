import React from 'react';
import UploadImage from './components/UploadImage';
import FoodItemsList from './components/FoodItemsList';
import ResultsContainer from './components/ResultsContainer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='app'>
      <h1>SnackSnap</h1>
      <UploadImage />
      <FoodItemsList />
      <ResultsContainer />
    </div>
  );
};

export default App;
