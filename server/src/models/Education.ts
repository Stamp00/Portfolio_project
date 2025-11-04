import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  year: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
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

export default mongoose.model<IEducation>('Education', EducationSchema);
