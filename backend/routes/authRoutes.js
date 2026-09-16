import express from 'express'
import {
  getGoogleAuthUrl,
  handleGoogleCallback,
  getCurrentUser,
  logout
} from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/google/url', getGoogleAuthUrl)
router.get('/google/callback', handleGoogleCallback)
router.get('/me', requireAuth, getCurrentUser)
router.post('/logout', logout)

export default router
