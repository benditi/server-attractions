import express from 'express'
import  log  from '../../middlewares/logger.middleware'
import {  getAttractions } from './attraction.controller'
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getAttractions)
// router.delete('/:id',  requireAuth, deleteattraction)

export default router