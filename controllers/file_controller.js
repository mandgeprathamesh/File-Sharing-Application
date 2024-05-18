import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v4 as uuidv4} from 'uuid';
import File from '../model/file.js';
import mailer from "../services/email_services.js";
import template from "../services/email_template.js";


const uploadfile=async(req,res)=>{
    if(req.files){
        try {
            const filepath=await uploadOnCloudinary(req.files.imagefile);
            console.log("route ke andar ka path:-",filepath);
            const file = new File({
                filename: filepath.original_filename,
                uuid: uuidv4(),
                path: filepath.url
            });
            console.log("colllection bangaya  hai");
            const response = await file.save();
            res.status(200).json({downloadfilepath:filepath.url});
        } catch (error) {
            res.status(400).json({msg:"Some Error Occured"});
        }
    }
    else{
        res.status(400).json({msg:"File is Not uploaded"});
    }
}

const getfile=async(req,res)=>{
    const para=req.params;
    console.log("para is:-",para.uuid);
    if(para){
        try {
            const file=await File.findOne({uuid:para.uuid});
            console.log(file);
            res.status(200).json({data:file.path});
        } catch (error) {
            res.status(400).json("Some error occured");
        }
    }
    else{
        res.status(400).json({msg:"uuid is Not uploaded"});
    }
}

const sendfile=async(req,res)=>{
    const { uuid, emailTo, emailFrom} = req.body;
    console.log(uuid,emailFrom,emailTo);

    if(!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required.'});
    }

    try {
        const file = await File.findOne({ uuid: uuid });
        if(file.sender) {
            return res.status(422).send({ error: 'Email already sent once.'});
        }
        file.sender = emailFrom;
        file.receiver = emailTo;
        const response = await file.save();
        mailer({from: emailFrom,
            to: emailTo,
            subject: 'inShare file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: template({
                      emailFrom, 
                      downloadLink: file.path}).then(() => {
                        return res.json({success: true});
                      }).catch(err => {
                        return res.status(500).json({error: 'Error in email sending.'});
                      })});
        
    } catch (error) {
        return res.status(500).send({ error: 'Something went wrong.'});
    }
}

export {uploadfile,getfile,sendfile};