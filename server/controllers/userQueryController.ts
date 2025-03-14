import OpenAI from 'openai';
import multer from 'multer';

const openai = new OpenAI({
  apiKey:''
});

type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
// console.log('✅ 📸 Multer',upload)

//controller that is meant to parse image sent from front end,
export const parseImage = async (req, res, next): Promise<void> => {
  console.log('🌮 parseImage middleware reached');
  //changed to req.file since it seems this is built in
  if (!req.file) {
    res.status(400).json({ message: '❌ 📷 no image uploaded' });
    return;
  }
  try {
    //upload.single(req.file.originalname)
    console.log('hello');
    // console.log(req.file.originalname)
    console.log(req.file);
    //console.log('food Image;', upload.single())
    //theoretically should pass foodImage to res.locals for the next middleware which is in openaiController
    // const foodImage = '../assests/th.jpeg';
    // res.locals.foodimage = foodImage;

    return next();
  } catch (error) {
    res
      .status(500)
      .json({ message: '❌ 📥 Error processing image', error: error.message });
  }
};



export const getNutritionAnalysis = async (req: any, res, next) => {
  const suggestionQuery = req.body;

  const stringSuggestionQuery = JSON.stringify(suggestionQuery)
  console.log('🎸 stringSuggestionQuery: ', stringSuggestionQuery)
  console.log('🍕 getNutritionAnalysis middleware reached');

  const systemPrompt = `
  You are an expert nutritionist analyzing food intake for one of three daily meals. Remeber that the user intake values you are recieving are for onlt one of three meals not the entire days worth.
  Determine the macronutrient breakdown as a percentage of total macronutrients for one of three meals in the day.
  Provide feedback if macronutrient values fall outside daily recommended ranges.  The below values are for one full day of eating. Remember that the value you are recieving are one of three meals per day. 
    - Protein: 100 - 170 grams
    - Carbohydrates: 225 - 275 grams
    - Fat: 30 - 50 grams

    This is an example of the daily recommended values of nutrients a person needs based on the input, compare the given values with these preset values to give a qualitative analysis to the user. such as you may be low in protein, you may want to consider eating more protein heavy foods.

      
  Your response should be no more than 4 sentences long.  
  Give actionable diet improvement suggestions.
  Give supportive but good critical feedback.
  If the meal is unhealthy make it known but make sure your final sentence is a postive affirmation that the user will be okay.
  `;

  console.log('🙈SuggestionQuery send to OpenAI:',`${suggestionQuery}`)

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: stringSuggestionQuery },
      ],
      temperature: 0.3,
    });
    console.log('✍️ response: ', response.choices[0].message);
    if (
      !response.choices ||
      response.choices.length === 0 ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      const error: ServerError = {
        log: 'OpenAI did not return a completion',
        status: 500,
        message: { err: 'An error occurred while querying OpenAI' },
      };
      return next(error);
    }
    const suggestion = await response.choices[0].message.content;
    console.log('🍭suggestion: ', suggestion)
    res.locals.suggestion = suggestion;

  } catch (error) {
    console.error('Error fetching AI response:', error);
  }
  return next();
};
