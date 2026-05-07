import mongoose, { mongo } from "mongoose";

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    if(db.connections[0].readyState){
      console.log("DB Connected Successfully");
    }
  } catch (err) {
    console.log("Faild to connect DB", err);
    process.exit(1);
  }
};
