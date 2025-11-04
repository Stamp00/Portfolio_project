import { Router } from 'express';
import { loginAdmin, getAdminProfile, createAdmin } from '../controllers/adminController';
import { getAllMessages, markAsRead, deleteMessage } from '../controllers/contactController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/setup', createAdmin); // For initial setup only

// Protected routes
router.get('/profile', authenticateAdmin, getAdminProfile);
router.get('/messages', authenticateAdmin, getAllMessages);
router.patch('/messages/:id/read', authenticateAdmin, markAsRead);
router.delete('/messages/:id', authenticateAdmin, deleteMessage);

export default router;
