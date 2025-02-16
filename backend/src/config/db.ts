import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('MONGO_URI não está definida no arquivo .env');
    }

    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);  // Encerra o processo em caso de falha
  }
};

export default connectDB;
