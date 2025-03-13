
import OpenAI from 'openai';
import multer from 'multer';


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






