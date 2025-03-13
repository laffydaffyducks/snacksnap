import React, { useState } from 'react';

interface FoodItem {
  name: string;
  portion: string;
}

const FoodItemsList: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { name: '', portion: '' },
  ]);

  const handleAddItem = () => {
    setFoodItems([...foodItems, { name: '', portion: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index][field] = value;
    setFoodItems(newFoodItems);
  };

  const handleDeleteItem = (index: number) => {
    const newFoodItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(newFoodItems);
  };

  const handleSubmit = () => {
    //handler to submit items to the backend
  };

  return (
    <div>
      <h1>Food Items List</h1>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Portion (grams/oz)</th>
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