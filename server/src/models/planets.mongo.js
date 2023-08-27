import mongoose from "mongoose";

const planetsSchema = new mongoose.Schema({
    keplerName: {
      type: String,
      required: true,
    },
  });
  
// Connects the schema to the collection
export default mongoose.model('Planet', planetsSchema);
