import { Request, Response } from 'express';
import AboutInfo from '../models/AboutInfo';

export const getAboutInfo = async (req: Request, res: Response) => {
  try {
    let aboutInfo = await AboutInfo.findOne();
    if (!aboutInfo) {
      aboutInfo = await AboutInfo.create({
        text: 'About me text goes here',
      });
    }
    res.json(aboutInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about info' });
  }
};

export const updateAboutInfo = async (req: Request, res: Response) => {
  try {
    let aboutInfo = await AboutInfo.findOne();
    if (!aboutInfo) {
      aboutInfo = await AboutInfo.create(req.body);
    } else {
      aboutInfo = await AboutInfo.findByIdAndUpdate(
        aboutInfo._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    res.json(aboutInfo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update about info' });
  }
};
