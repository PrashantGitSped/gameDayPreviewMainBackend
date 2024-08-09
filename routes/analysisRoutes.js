const express = require('express');
const router = express.Router();
const {getPlayerPerformance, getMatchPrediction} = require('../controllers/analysisController');
const authMiddleware = require('../middleware/authMiddleware')


router.get('/player-performance/:playerId', authMiddleware, getPlayerPerformance);
router.post('/match-prediction', authMiddleware, getMatchPrediction);

module.exports = router;