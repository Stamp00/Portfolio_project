import { Request, Response } from 'express';
import HeroInfo from '../models/HeroInfo';

export const getHeroInfo = async (req: Request, res: Response) => {
  try {
    let heroInfo = await HeroInfo.findOne();
    if (!heroInfo) {
      heroInfo = await HeroInfo.create({
        header: 'Welcome',
        subheader: 'Your Subheader',
        text: 'Your hero section text',
      });
    }
    res.json(heroInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero info' });
  }
};

export const updateHeroInfo = async (req: Request, res: Response) => {
  try {
    let heroInfo = await HeroInfo.findOne();
    if (!heroInfo) {
      heroInfo = await HeroInfo.create(req.body);
    } else {
      heroInfo = await HeroInfo.findByIdAndUpdate(
        heroInfo._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    res.json(heroInfo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update hero info' });
  }
};
