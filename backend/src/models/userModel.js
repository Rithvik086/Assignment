import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
  },
  assignedtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
},{
    timestamps: true,
  });

export default mongoose.model("User", userSchema);
