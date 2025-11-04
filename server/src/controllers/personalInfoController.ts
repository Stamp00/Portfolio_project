import { Request, Response } from 'express';
import PersonalInfo from '../models/PersonalInfo';

export const getPersonalInfo = async (req: Request, res: Response) => {
  try {
    let info = await PersonalInfo.findOne();

    // If no info exists, create default
    if (!info) {
      info = new PersonalInfo({
        name: 'Your Name',
        title: 'Your Title',
        email: 'your.email@example.com',
        location: 'Your Location',
        bio: 'Your bio here...',
        githubUrl: '',
        linkedinUrl: '',
      });
      await info.save();
    }

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personal info' });
  }
};

export const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    let info = await PersonalInfo.findOne();

    if (!info) {
      info = new PersonalInfo(req.body);
    } else {
      Object.assign(info, req.body);
    }

    await info.save();
    res.json(info);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update personal info' });
  }
};
