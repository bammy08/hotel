import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import mongoose from 'mongoose';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels';
import bookingRoutes from './routes/my-bookings';

import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true, // Allow cookies and other credentials
  })
);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', myHotelRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/my-bookings', bookingRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(7000, () => {
  console.log('Server running on port 7000');
});
