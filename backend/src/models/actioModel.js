import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  task:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Task",
    required:false
  },
  detail:{
    type:String,
    required:true
  },
  timestamp:{
    type:Date,
    default:Date.now()
  }
});

export default mongoose.model("Action",actionSchema)
