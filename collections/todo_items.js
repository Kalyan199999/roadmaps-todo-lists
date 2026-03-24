const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

} , {timestamps:true})

const ToDoItem = mongoose.model("ToDoItem" , todoListSchema )

module.exports = ToDoItem;