import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectdb } from './config/db.js';
import filerouter from './routes/file_routes.js';
const app=express();
import fileUpload from 'express-fileupload';

connectdb();
// Middlewares
app.use(fileUpload({
    useTempFiles : true,
   tempFileDir : '/tmp/',
   
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();

const port=process.env.PORT || 3000;

app.use('/api/file',filerouter);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
 