import express from 'express';
import {getfile, sendfile, uploadfile} from '../controllers/file_controller.js'
const router=express.Router();

router.post('/uploadfile',uploadfile);
router.get('/:uuid',getfile);
router.post('/send',sendfile)

export default router;