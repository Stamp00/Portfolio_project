import { Router } from 'express';
import { getPersonalInfo, updatePersonalInfo } from '../controllers/personalInfoController';
import { getHeroInfo, updateHeroInfo } from '../controllers/heroInfoController';
import { getAboutInfo, updateAboutInfo } from '../controllers/aboutInfoController';
import { getContactInfo, updateContactInfo } from '../controllers/contactInfoController';
import { getAllSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { getAllExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { getAllEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController';
import { seedDatabase } from '../controllers/seedController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public routes (for frontend to fetch data)
router.get('/personal-info', getPersonalInfo);
router.get('/hero-info', getHeroInfo);
router.get('/about-info', getAboutInfo);
router.get('/contact-info', getContactInfo);
router.get('/skills', getAllSkills);
router.get('/experience', getAllExperience);
router.get('/education', getAllEducation);

// Protected routes (admin only)
router.put('/personal-info', authenticateAdmin, updatePersonalInfo);
router.put('/hero-info', authenticateAdmin, updateHeroInfo);
router.put('/about-info', authenticateAdmin, updateAboutInfo);
router.put('/contact-info', authenticateAdmin, updateContactInfo);

router.post('/skills', authenticateAdmin, createSkill);
router.put('/skills/:id', authenticateAdmin, updateSkill);
router.delete('/skills/:id', authenticateAdmin, deleteSkill);

router.post('/experience', authenticateAdmin, createExperience);
router.put('/experience/:id', authenticateAdmin, updateExperience);
router.delete('/experience/:id', authenticateAdmin, deleteExperience);

router.post('/education', authenticateAdmin, createEducation);
router.put('/education/:id', authenticateAdmin, updateEducation);
router.delete('/education/:id', authenticateAdmin, deleteEducation);

// Seed route (admin only)
router.post('/seed', authenticateAdmin, seedDatabase);

export default router;
