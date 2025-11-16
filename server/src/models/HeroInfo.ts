import mongoose, { Document, Schema } from 'mongoose';

export interface IHeroInfo extends Document {
  header: string;
  subheader: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroInfoSchema: Schema = new Schema(
  {
    header: {
      type: String,
      required: [true, 'Header is required'],
      trim: true,
    },
    subheader: {
      type: String,
      required: [true, 'Subheader is required'],
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'Text is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHeroInfo>('HeroInfo', HeroInfoSchema);
