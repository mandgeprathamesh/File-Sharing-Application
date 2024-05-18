import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uuid: { type: String, required: true },
    sender: { type: String},
    receiver: { type: String},
}, { timestamps: true });

const File= mongoose.model('File', fileSchema);
export default File;