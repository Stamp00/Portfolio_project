import mongoose, { Document, Schema } from 'mongoose';

export interface IPersonalInfo extends Document {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInfoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);
