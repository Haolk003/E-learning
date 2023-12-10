import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOOSE_CONNECT}`).then((data) => {
      console.log(`Database connect with ${data.connection.host}`);
    });
  } catch (err: any) {
    console.log(err);
    setTimeout(mongoConnect, 5000);
  }
};
