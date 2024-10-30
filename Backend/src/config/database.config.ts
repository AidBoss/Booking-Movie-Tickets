import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// Định nghĩa kiểu cho dbState
interface DbState {
   value: number;
   label: string;
}

// Định nghĩa trạng thái kết nối
const dbState: DbState[] = [
   {
      value: 0,
      label: "disconnected",
   },
   {
      value: 1,
      label: "connected",
   },
   {
      value: 2,
      label: "connecting",
   },
   {
      value: 3,
      label: "disconnecting",
   },
];

// Hàm kết nối đến MongoDB
const connection = async (): Promise<void> => {
   try {
      // Cấu hình kết nối
      const options: mongoose.ConnectOptions = {
         dbName: process.env.MONGO_DB_NAME,
         user: process.env.MONGO_DB_USERNAME,
         pass: process.env.MONGO_DB_PASSWORD,
         socketTimeoutMS: 5000,
         connectTimeoutMS: 5000,
      };

      // Kết nối tới MongoDB
      await mongoose.connect(process.env.DB_HOST || '9999', options);

      // Lấy trạng thái kết nối
      const state = Number(mongoose.connection.readyState);

      // In ra trạng thái kết nối
      const connectionState = dbState.find((f) => f.value === state)?.label;
      console.log(connectionState, "to db");
   } catch (error) {
      console.error('Error connecting to the database:', error);
   }
};

// Export module theo cú pháp ES6
export default connection;
