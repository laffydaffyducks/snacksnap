import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import multer from "multer";
import fs from "fs";


export type ServerError = {
    log: string;
    status: number;
    message: { err: string };
  };

dotenv.config();
const openAIKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: openAIKey });

export const openAIFoodBreakdown: RequestHandler = async (req: any, res, next) => {
    // console log to know if openAIFoodBreakdown has been reached
    console.log('🦄 openAIFoodBreakdown middleware has been reached')
    //destructering 
    { foodImage } = res.locals
    //check if the image exists if not error handling
    if (!foodImage) {
        const error: ServerError = {
          log: 'title not provided',
          status: 400,
          message: { err: 'An error occurred while analysing the image' },
        };
        return next(error);
      }
      try {
        // Convert the image buffer to base64
        const base64FoodImage = foodImage.buffer.toString("base64");
        //converts the image to the type that the image is
        const mimeType = foodImage.mimetype; // Example: "image/png"
        
        //creating the open image parsing 
        const response = await openai.chat.completions.create({
            model: "gpt-4o", 
            messages: [ {
                role: 'system',
                content: prompt
            }, {
                role: 'assistant',
                content: assistantPrompt
            }
              {
                role: "user",
                content: [
                  { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } },
                ],
              },
            ],
          });
    }














