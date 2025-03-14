
import OpenAI from 'openai';
import multer from 'multer';
import { ServerError } from './openaiController';
 const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
// console.log('✅ 📸 Multer',upload)

//controller that is meant to parse image sent from front end,
export const parseImage = async (req, res, next): Promise<void> => {
    console.log('🌮 parseImage middleware reached')
    //changed to req.file since it seems this is built in
    if (!req.file) {
        res.status(400).json ({message: '❌ 📷 no image uploaded'});
        return;
    }
    try {
        //upload.single(req.file.originalname)
        console.log('hello')
        // console.log(req.file.originalname)
        console.log(req.file)
        //console.log('food Image;', upload.single())
        //theoretically should pass foodImage to res.locals for the next middleware which is in openaiController
        // const foodImage = '../assests/th.jpeg';
        // res.locals.foodimage = foodImage;
        
        return next();
    } catch (error) {
        res.status(500).json({ message: "❌ 📥 Error processing image", error: error.message });
    }
}


// Sample food intake data
const foodData = [
  {
    Name: "Chicken Breast",
    Weight: "200g",
    Calories: 330,
    Fat_total_g: 7,
    Protein_g: 62,
    Carbohydrates_g: 0,
  },
  {
    Name: "Brown Rice",
    Weight: "150g",
    Calories: 165,
    Fat_total_g: 1.5,
    Protein_g: 4,
    Carbohydrates_g: 36,
  },
];

export const getNutritionAnalysis = async (req: any, res, next) => {
  const prompt = `
  You are an AI nutritionist analyzing food intake for one of three meals.
  Given the following food data:
  ${JSON.stringify(foodData, null, 2)}


  - Determine the macronutrient breakdown as a percentage of total macronutrients for one of three meals in the day.
  - Provide feedback if macronutrient values fall outside daily recommended ranges:
    - Protein: 10-35%
    - Carbohydrates: 45-65%
    - Fat: 20-35%
  - Give actionable diet improvement suggestions.
  - Give supportive but good critical feedback.
  
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.3,
    });
    if (
        !response.choices || 
        response.choices.length === 0 || 
        !response.choices[0].message ||
        !response.choices[0].message.content
      )
      {
        const error: ServerError = {
          log: 'OpenAI did not return a completion',
          status: 500,
          message: { err: 'An error occurred while querying OpenAI' },
        };
        return next(error);
      }
    const suggestion = response.choices[0].message.content;
    res.local.suggestion = suggestion;
  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
}




