import 'dotenv/config';
import OpenAI from 'openai';

export type ServerError = {
    log: string;
    status: number;
    message: { err: string };
  };

// const calNinjaAPI = process.env.CALORIE_NINJAS_API
// console.log(calNinjaAPI)
//   console.log('🔑 OpenAI API Key:', process.env.OPENAI_API_KEY);
//   const openAIKey: string = process.env.OPENAI_API_KEY || "";
//   if (!openAIKey) {
//     throw new Error("The OPENAI_API_KEY environment variable is missing or empty.");
//   }
  const openai = new OpenAI({ apiKey:  });

export const openAIFoodBreakdown = async (req: any, res, next) => {
    // console log to know if openAIFoodBreakdown has been reached
    console.log('🦄 openAIFoodBreakdown middleware has been reached')
    //destructering 
  
    //check if the image exists if not error handling
    if (!req.file) {
        const error: ServerError = {
          log: 'title not provided',
          status: 400,
          message: { err: 'An error occurred while analysing the image' },
        };
        return next(error);
      }
      try {
        // Convert the image buffer to base64
        //might need to use req.file since file is inside multer
        const base64FoodImage = req.file.buffer.toString("base64");
        
        //converts the image to the type that the image is
        const mimeType = req.file.mimetype; // Example: "image/png"
        //below is prompt for gpt-4o to analyse food image and return back the correctly formatted response
        const systemPrompt = `
    You are a food analysis expert.  
    There is no food item that you cannot recognize.  
    You are looking at a picture of food.  

    ### **Instructions:**
    - **Ignore background objects** and focus **only on food items**.
    - If a dish is a **combination of ingredients**, return the **name of the dish** instead of listing ingredients separately.
      - **Example:** If the image contains spaghetti with marinara sauce, return \`"spaghetti"\`, not \`"noodles", "tomato sauce", "cheese"\`.
    - **Estimate the weight of each food item** in grams.
    - **Do not include spices, garnishes, or minor ingredients** that do not significantly impact the dish.

    ### **Response Format (Strict JSON)**
    You must **ONLY** return an array of objects **in valid JSON format**:
    "[
      { "name": "steak", "portion": "100", "unit": "grams" },
      { "name": "mashed potatoes", "portion": "100", "unit": "grams" }
    ]"

    ### **Important Formatting Rules:**
    ✅ **All values must be strings** (including portion values).  
    ✅ **No markdown, explanations, or extra text**.  
    ✅ **No backticks (\`\`\`) or unnecessary characters**.  
    ✅ **Ensure JSON is valid and properly formatted**.
    ✅ **Make sure to keep the array wrapped in double quotations 
    If there are more ingredients, add them to the array following the same format.
    `;
        //creating the open image parsing 
        const response = await openai.chat.completions.create({
            model: "gpt-4o", 
            messages: [ {
                role: 'system',
                content: systemPrompt
            }, 
              {
                role: "user",
                content: [
                  { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64FoodImage}` } },
                ],
              },
            ],
            temperature: 0.2,
          });
          //error handling to check if the correct responses are coming back from gpt
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
          //storing the response in the res.locals object
          res.locals.foodAnalysis = response.choices[0].message.content;
       
          //checking to see what the response is
          console.log('😂hi:',response.choices[0].message);
          return next ();

    }
    catch (error) {
      res.status(500).json({message: "❌ 🦾 Error AI processing image", error: error.message})
    }
}














