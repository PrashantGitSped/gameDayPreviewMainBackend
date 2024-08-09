const Match = require('../models/Match');
const Player = require('../models/Player');

exports.createMatch = async (req,res)=>{
    try{
        //console.log(req.body)
        //res.send("inside createm match");

        const match = new Match(req.body)
        await match.save();
        res.status(201).json(match)



    }catch(error){
        res.status(400).json({message: error.message})
    }
}

exports.createMatchWithArray = async (req,res) => {
    const matchesToSave = req.body;
    /*
    try {

        const savedMatches = await Match.insertMany(matchesToSave);
        console.log('Matches saved successfully:', savedMatches);
        res.status(201).json({ message: 'Matches saved successfully', savedMatches });
    } catch (err) {
        console.error('Error saving matches:', err);
        res.status(500).json({ error: 'Error saving matches' });
    }
    //usning insert many


     */



    try {
        const savedMatches = [];
        for (let matchData of matchesToSave) {
            const match = new Match(matchData);
            const savedMatch = await match.save();
            savedMatches.push(savedMatch);
        }

        //console.log('Matches saved successfully:', savedMatches);
        res.status(201).json({ message: 'Matches saved successfully'});
    } catch (err) {
        console.error('Error saving matches:', err);
        res.status(500).json({ error: 'Error saving matches' });
    }
}

exports.getMatch = async (req,res) => {
    try{
        //console.log(req.params.id)
        //res.send('iinside getmatchoutcome prediction')

        const match = await Match.findById(req.params.id);
        if(!match){
            return res.status(404).json({message: 'Match not found'});
        }
        //const prediction = "Team A is likely to win";
        res.json({match})

    }catch(error){
        res.status(500).json({message:error.message})
    }
};

exports.getMatches = async(req,res) => {
    try{
        //console.log('this is get MatcheS')
        //res.send("this is get Matches")
        const matches = await Match.find()
        res.json(matches)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getPlayersForMatch = async (req, res) => {
    try {
        const { matchId } = req.params;
        const players = await Player.find({ 'performance.matchId': matchId });
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};