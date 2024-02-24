import mongoose from "mongoose";
import app from "./app.js";
import dotevn from 'dotenv';

dotevn.config() 

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connect success!');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  });

