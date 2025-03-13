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
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
        There is no food item that you can not recognize.  
        You are going to be looking at a picture of food. 
        Ignore all items in the background only focus on what you deem to be food items.
        If you can see an amalgamation of items that create a common dish then you can just name the dish.
        For example if you see spaghetti send back spaghetti not noodles, marinara, parmaesan cheese.
        For each food item you send back also send back the estimated weight of that item in grams.
        Ignore sending back spices, and any minor ingredients that are not significant.
        The data that you send back should be in this form, it should be an array of objects.  For example:
        If you detect 100 grams of steak and 100 grams of mashed potatoes you should send back this:

        [{name: 'steak', portion: 100, units: grams}, {name: 'mashed potatoes', portion: 100, units: grams}]

        Your response should only be in the above format.  
        If there are more ingredients you should add the appropiate amount of objects into the array.
        Do not include markdown in your response.
        `
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
          console.log(response.choices[0].message.content);
          return next ();

    }
    catch (error) {
      res.status(500).json({message: "❌ 🦾 Error AI processing image", error: error.message})
    }
}














