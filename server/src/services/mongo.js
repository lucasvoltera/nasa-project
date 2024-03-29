import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Carrega as variáveis de ambiente do arquivo .env

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
  
  async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
  }
  
  async function mongoDisconnect() {
    await mongoose.disconnect();
  }
  
  export {
    mongoConnect,
    mongoDisconnect,
  }