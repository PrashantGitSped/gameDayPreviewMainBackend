const express = require('express')
const router = express.Router()
const {createPlayer, getPlayer,getPlayerStats} = require('../controllers/playerController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, createPlayer)
router.get('/stats', authMiddleware, getPlayerStats)
router.get('/:id', authMiddleware, getPlayer)

module.exports = router