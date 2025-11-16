import { Request, Response } from 'express';
import ContactInfo from '../models/ContactInfo';

export const getContactInfo = async (req: Request, res: Response) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = await ContactInfo.create({
        email: 'your@email.com',
        phone: '+1234567890',
        location: 'Your Location',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
      });
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
};

export const updateContactInfo = async (req: Request, res: Response) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      contactInfo = await ContactInfo.create(req.body);
    } else {
      contactInfo = await ContactInfo.findByIdAndUpdate(
        contactInfo._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update contact info' });
  }
};
