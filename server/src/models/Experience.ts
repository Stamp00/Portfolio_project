import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  period: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    period: {
      type: String,
      required: [true, 'Period is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
