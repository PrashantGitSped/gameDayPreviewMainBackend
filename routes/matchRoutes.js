const express = require('express')
const router = express.Router()
const {createMatch, getMatch, createMatchWithArray, getMatches, getPlayersForMatch} = require('../controllers/matchController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, createMatch)
router.get('/details', authMiddleware, getMatches)
router.post('/array', authMiddleware, createMatchWithArray)
router.get('/:id',authMiddleware, getMatch)


// Endpoint to get players for a specific match
router.get('/players-for-match/:matchId', authMiddleware, getPlayersForMatch)



module.exports = router