import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DB_URL;

const connection = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    throw new Error(`Error occurred while connecting database ${e}`);
  });

export default connection;