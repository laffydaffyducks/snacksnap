

const CALORIE_NINJAS_API: string ='EVipzwkQ5Vjj0hXw3uC24g==4SQ1QIoD46fqcPcb'

export const fetchCalNinjaApi = async (req: any, res: any, next: any) => {
    console.log('🥩 fetchCalNinjaApi middleware has been reached')
//we are going to be sent an array objects we want to break them down into a string that has weight and name for each indiviudual object
const array = req.body
console.log('🧍🏻 req.body1', array)
//[{'name': 'beef patty', 'portion': '150', 'units': 'grams'}, {'name': 'rice', 'portion': '200', 'units': 'grams'}, {'name': 'mixed vegetables', 'portion': '100', 'units': 'grams'}]
//have an empty array and we push in all element in order of each index of the original array
const newArray: string[] = [];
array.map((ele) => {
    newArray.push(`${ele.portion}${ele.units} of ${ele.name}`)
})
const foodArray: string = newArray.join(', ')
console.log(foodArray)

//example of what we want to return '150 grams of beef patty, 200 grams of rice, 100 grams of mixed vegetables'
// what we want
// '150 grams of beef patty, 200 grams of rice, 100 grams of mixed vegetables'
// ' 150 grams of beef, 200 grams of rice, 100 grams of mixed vegetables '
    try {
        const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query= ${foodArray} `, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': CALORIE_NINJAS_API
            }
        })
        const data = await response.json();
        res.locals.foodAnalysis = data;
        console.log(data)
        return next();
    } catch (error) {
        console.log('❌ Error in fetchCalNinjaApi middleware', error);
        return next(error);
    }
}

export const calorieNinjaParseData = async (req: any, res: any, next: any) => {
    console.log('🍆 calorieNinjaParseData middleware reached')
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

for (let i: number = 0; i < array.length; i++) {
    totalSodium += array[i].sodium_mg;
    totalCholesterol += array[i].cholesterol_mg
    totalSugar += array[i].sugar_g
    totalFiber += array[i].fiber_g;
    totalPotassium += array[i].potassium_mg;
    totalCalories += array[i].calories;
    totalFat += array[i].fat_total_g;
    totalProtein += array[i].protein_g;
    totalCarbs += array[i].carbohydrates_total_g;
}


next();
}
//     //now that we have the food data target cal, fat, protein, carbsa and add all the value from each respecte key across each object up and return a single object with total values
    



// items: [
//   {
//     name: 'beef patty',
//     calories: 353.3,
//     serving_size_g: 150,
//     fat_total_g: 21, 
//     fat_saturated_g: 8.1,
//     protein_g: 36.7, 146.8
//     sodium_mg: 120,
//     potassium_mg: 311,
//     cholesterol_mg: 125,
//     carbohydrates_total_g: 0,
//     fiber_g: 0,
//     sugar_g: 0
//   },
//   {
//     name: 'rice',
//     calories: 254.8,
//     serving_size_g: 200,
//     fat_total_g: 0.6,
//     fat_saturated_g: 0.2,
//     protein_g: 5.3,
//     sodium_mg: 2,
//     potassium_mg: 85,
//     cholesterol_mg: 0,
//     carbohydrates_total_g: 56.9,
//     fiber_g: 0.8,
//     sugar_g: 0.1
//   },
//   {
//     name: 'mixed vegetables',
//     calories: 33.3,
//     serving_size_g: 100,
//     fat_total_g: 0.3,
//     fat_saturated_g: 0.1,
//     protein_g: 1.7,
//     sodium_mg: 31,
//     potassium_mg: 40,
//     cholesterol_mg: 0,
//     carbohydrates_total_g: 7,
//     fiber_g: 2.9,
//     sugar_g: 2.6
//   }
// ]
// }




// {
//     items: [
//       {
//         name: 'beef patty',
//         calories: 353.3,
//         serving_size_g: 150,
//         fat_total_g: 21,
//         fat_saturated_g: 8.1,
//         protein_g: 36.7,
//         sodium_mg: 120,
//         potassium_mg: 311,
//         cholesterol_mg: 125,
//         carbohydrates_total_g: 0,
//         fiber_g: 0,
//         sugar_g: 0
//       },
//       {
//         name: 'rice',
//         calories: 254.8,
//         serving_size_g: 200,
//         fat_total_g: 0.6,
//         fat_saturated_g: 0.2,
//         protein_g: 5.3,
//         sodium_mg: 2,
//         potassium_mg: 85,
//         cholesterol_mg: 0,
//         carbohydrates_total_g: 56.9,
//         fiber_g: 0.8,
//         sugar_g: 0.1
//       },
//       {
//         name: 'mixed vegetables',
//         calories: 33.3,
//         serving_size_g: 100,
//         fat_total_g: 0.3,
//         fat_saturated_g: 0.1,
//         protein_g: 1.7,
//         sodium_mg: 31,
//         potassium_mg: 40,
//         cholesterol_mg: 0,
//         carbohydrates_total_g: 7,
//         fiber_g: 2.9,
//         sugar_g: 2.6
//       }
//     ]
//   }

// [{name: 'calories',
//     userintake: 300,
//     recommended: 2000,
//     units: 'cals'
// }, {
//     fat: 20,
// }
//     fat: 20,
//     carbs: 20,
//     protein: 20,
//     {nutrients:}
// }