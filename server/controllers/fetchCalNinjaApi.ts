const CALORIE_NINJAS_API: string = 'EVipzwkQ5Vjj0hXw3uC24g==4SQ1QIoD46fqcPcb';

export const fetchCalNinjaApi = async (req: any, res: any, next: any) => {
  console.log('🥩 fetchCalNinjaApi middleware has been reached');
  //we are going to be sent an array objects we want to break them down into a string that has weight and name for each indiviudual object
  const array = req.body;
  console.log('🧍🏻 req.body1', array);
  //[{'name': 'beef patty', 'portion': '150', 'units': 'grams'}, {'name': 'rice', 'portion': '200', 'units': 'grams'}, {'name': 'mixed vegetables', 'portion': '100', 'units': 'grams'}]
  //have an empty array and we push in all element in order of each index of the original array
  const newArray: string[] = [];
  array.map((ele) => {
    newArray.push(`${ele.portion}${ele.units} of ${ele.name}`);
  });
  const foodArray: string = newArray.join(', ');
  console.log(foodArray);

  //example of what we want to return '150 grams of beef patty, 200 grams of rice, 100 grams of mixed vegetables'
  // what we want
  // '150 grams of beef patty, 200 grams of rice, 100 grams of mixed vegetables'
  // ' 150 grams of beef, 200 grams of rice, 100 grams of mixed vegetables '
  try {
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query= ${foodArray} `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': CALORIE_NINJAS_API,
        },
      }
    );
    const data = await response.json();
    res.locals.foodAnalysis = data;
    console.log(data);
    return next();
  } catch (error) {
    console.log('❌ Error in fetchCalNinjaApi middleware', error);
    return next(error);
  }
};

export const calorieNinjaParseData = async (req: any, res: any, next: any) => {
  console.log('🍆 calorieNinjaParseData middleware reached');
  const array = res.locals.foodAnalysis.items;
  console.log(array);
  let totalCalories: number = 0;
  let totalFat: number = 0;
  let totalProtein: number = 0;
  let totalCarbs: number = 0;
  let totalSodium: number = 0;
  let totalPotassium: number = 0;
  let totalFiber: number = 0;
  let totalSugar: number = 0;
  let totalCholesterol: number = 0;
  try {
    for (let i: number = 0; i < array.length; i++) {
      totalSodium += array[i].sodium_mg;
      totalCholesterol += array[i].cholesterol_mg;
      totalSugar += array[i].sugar_g;
      totalFiber += array[i].fiber_g;
      totalPotassium += array[i].potassium_mg;
      totalCalories += array[i].calories;
      totalFat += array[i].fat_total_g;
      totalProtein += array[i].protein_g;
      totalCarbs += array[i].carbohydrates_total_g;
    }
    interface FoodTotal {
      name: string;
      userIntake: number;
      recommended: number;
      units: string;
    }
    const foodTotals: FoodTotal[] = [
      {
        name: 'calories',
        userIntake: totalCalories,
        recommended: 2000,
        units: 'cals',
      },
      {
        name: 'Fat',
        userIntake: totalFat,
        recommended: 45,
        units: 'grams',
      },
      {
        name: 'Carbohydrates',
        userIntake: totalCarbs,
        recommended: 250,
        units: 'grams',
      },
      {
        name: 'Protein',
        userIntake: totalProtein,
        recommended: 150,
        units: 'grams',
      },
      {
        name: 'Sodium',
        userIntake: totalSodium,
        recommended: 2300,
        units: 'milligrams',
      },
      {
        name: 'Potassium',
        userIntake: totalPotassium,
        recommended: 4700,
        units: 'milligrams',
      },
      {
        name: 'Fiber',
        userIntake: totalFiber,
        recommended: 28,
        units: 'grams',
      },
      {
        name: 'Sugar',
        userIntake: totalSugar,
        recommended: 50,
        units: 'grams',
      },
      {
        name: 'Cholesterol',
        userIntake: totalCholesterol,
        recommended: 300,
        units: 'milligrams',
      },
    ];

    res.locals.foodTotals = foodTotals;
    console.log(foodTotals);
  } catch (error) {
    res.status(500).json({
      message: '❌ 🦾 Error AI processing image',
      error: error.message,
    });
  }
  return next();
};
