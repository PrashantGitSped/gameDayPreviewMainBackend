const analysisService = require('../services/analysisService');

const getPlayerPerformance = async (req,res) => {
    try{
        const{playerId} = req.params;
        const performance = await analysisService.getPlayerPerformance(playerId);
        res.json({performance});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getMatchPrediction =  async(req,res) => {
    try {
        const { teamA, teamB } = req.body;

        //const {teamA, teamB} = req.params
        const prediction = await analysisService.getMatchPrediction(teamA, teamB);
        res.json(prediction);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getPlayerPerformance,
    getMatchPrediction
};