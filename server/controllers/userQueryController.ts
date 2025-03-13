
import OpenAI from 'openai';
import multer from 'multer';
import { openAIFoodBreakdown } from './openaiController';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// dotenv.config();

//getting key from .env file
// const openAIKey = process.env.OPENAI_API_KEY
//creating a new instance of openAI using openai key
// const openai = new OpenAI({ apiKey: openAIKey });

//controller that is meant to parse image sent from front end,
export const parseImage = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json ({message: '❌ 📷 no image uploaded'})
    }
    try {
        const foodImage =req.file.buffer;
        res.locals.foodimage = foodImage;
        console.log('foodImage')
        next();
    }
    catch (error){
        res.status(500).json({message: "❌ 📥 Error processing image", error: error.message})
    }
}




// module.exports = upload;



