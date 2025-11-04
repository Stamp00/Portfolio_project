import { Request, Response } from 'express';
import Education from '../models/Education';

export const getAllEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education' });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create education' });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update education' });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education' });
  }
};
