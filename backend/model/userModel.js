import mongoose, { mongo } from "mongoose"

const taskSchema = new mongoose.Schema({
    dishname :{
        type:String,
        required : true
    },
    ingredients :{
        type:String,
        required : true
    },
    chefname :{
        type:String,
        required : true
    },
    noofplates :{
        type:String,
        required : true
    }
})

export default mongoose.model("Task", taskSchema)