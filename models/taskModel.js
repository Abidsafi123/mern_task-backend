import mongoose  from "mongoose";

const taskSchema = new mongoose.Schema({
 text:{
    type:String,
    required:[true,'Please enter a text1!']
 },
 user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'userModel',
 }
},{timestamps:true})

const taskModel = mongoose.model('Tasks',taskSchema)
export default taskModel
    
