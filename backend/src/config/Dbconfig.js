import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoDb_Url);
    console.log('db connected')
  } catch (err) {
    console.log("error connecting db" + err);
  }
};

export default dbConnect;
