import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Delete any existing admin accounts
    await Admin.deleteMany({});
    console.log('Cleared existing admin accounts');

    // Create new admin
    const admin = new Admin({
      email: 'jaari.samuel00@gmail.com',
      password: 'Miniclip3', // This will be hashed by the pre-save hook
      name: 'Samuel Jaari',
    });

    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('Email: jaari.samuel00@gmail.com');
    console.log('Password: Miniclip3');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
