import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'link' | 'certificate';
  url: string;
  content?: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  additionalFiles: IProjectFile[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectFileSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['image', 'pdf', 'link', 'certificate'], required: true },
  url: { type: String, required: true },
  content: { type: String },
});

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    technologies: {
      type: [String],
      required: true,
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    additionalFiles: {
      type: [ProjectFileSchema],
      default: [],
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

export default mongoose.model<IProject>('Project', ProjectSchema);
