import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // connecting to mongodb atlas using mongoose
    await mongoose.connect(config.database_url as string);

    // listeing to server port 5000
    app.listen(config.port, () => {
      console.log(`Server app is listening to port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
