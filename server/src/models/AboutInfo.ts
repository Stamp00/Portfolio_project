import mongoose, { Document, Schema } from 'mongoose';

export interface IAboutInfo extends Document {
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutInfoSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'About text is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAboutInfo>('AboutInfo', AboutInfoSchema);
