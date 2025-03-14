import React, { useState } from 'react';

// Define the FoodItem interface to type the food items
interface FoodItem {
  name: string;
  portion: string;
  unit: string;
}

const FoodItemsList: React.FC = () => {
  // Initialize the state with one empty food item
  const initialFoodItems: FoodItem[] = [
    { name: '', portion: '', unit: 'grams' },
  ];
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);

  // Function to add a new empty food item to the list
  const handleAddItem = () => {
    setFoodItems([...foodItems, { name: '', portion: '', unit: 'grams' }]);
  };

  // Function to convert portion to grams if the unit is 'oz'
  const convertToGrams = (portion: string, unit: string): string => {
    const portionValue = parseFloat(portion);
    if (isNaN(portionValue)) return portion;
    if (unit === 'oz') {
      return (portionValue * 28.35).toString(); // 1 oz = 28.3495 grams
    }
    return portion;
  };

  // Function to handle input changes for food items
  const handleInputChange = (
    index: number,
    field: keyof FoodItem,
    value: string
  ) => {
    const newFoodItems = [...foodItems];
    if (field === 'portion' || field === 'unit') {
      const unit = field === 'unit' ? value : newFoodItems[index].unit;
      const portion = field === 'portion' ? value : newFoodItems[index].portion;
      newFoodItems[index].portion = convertToGrams(portion, unit);
      newFoodItems[index].unit = 'grams';
    } else {
      newFoodItems[index][field] = value;
    }
    setFoodItems(newFoodItems);
  };

  // Function to delete a food item from the list
  const handleDeleteItem = (index: number) => {
    const newFoodItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(newFoodItems);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Check for empty fields
    for (const item of foodItems) {
      if (!item.name || !item.portion || !item.unit) {
        alert('Please fill in all fields before submitting.');
        return;
      }
    }
    // Handler to submit items to the backend
    console.log('🍔 data submit to backend: ', foodItems);
  };

  // Function to reset the food items to the initial state
  const handleReset = () => {
    setFoodItems(initialFoodItems);
  };

  return (
    <div>
      <h1>Food Items List</h1>
      <button onClick={handleReset}>Reset</button>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Portion</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type='text'
                  value={item.name}
                  onChange={(e) =>
                    handleInputChange(index, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type='text'
                  value={item.portion}
                  onChange={(e) =>
                    handleInputChange(index, 'portion', e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={item.unit}
                  onChange={(e) =>
                    handleInputChange(index, 'unit', e.target.value)
                  }
                >
                  <option value='grams'>grams</option>
                  <option value='oz'>oz</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FoodItemsList;
