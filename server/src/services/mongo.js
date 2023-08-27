import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://nasa-api:oKTYdofaHii6sOXS@nasa-cluster.i3xyml7.mongodb.net/?retryWrites=true&w=majority"

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