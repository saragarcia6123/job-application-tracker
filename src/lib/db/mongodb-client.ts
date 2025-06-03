import { config } from '@/lib/config';
import mongoose, { ConnectOptions } from 'mongoose';

export default class MongoDBClient {
  private static instance: MongoDBClient | null = null;
  public URI: string;
  public clientOptions: ConnectOptions;

  private constructor() {
    this.clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    this.URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/?retryWrites=true&w=majority&appName=${config.DB_NAME}`;
  }

  public static get(): MongoDBClient {
    if (this.instance !== null) {
      return this.instance;
    }

    this.instance = new MongoDBClient();
    return this.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.URI, this.clientOptions);
      console.log("Successfully connected to MongoDB");
    } catch (err) {
      console.error('Failed to connect to MongoDB: ', err);
    }
  }


  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('Error disconnecting from MongoDB:', err);
    }
  }

}