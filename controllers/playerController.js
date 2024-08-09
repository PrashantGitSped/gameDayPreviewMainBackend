const Player = require('../models/Player');

exports.createPlayer = async (req,res) => {
    try{
        //console.log(req.body, "hi body is empty");
        //res.send(req.body)

        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player)


    }catch(error){
        res.status(400).json({message: error.message});
    }
};

exports.getPlayerStats = async(req,res) => {
    //console.log("ping received")
    const players = await Player.find()
    res.send(players)
}

exports.getPlayer = async (req,res) => {
    try{
        //console.log(req.params.id)
        //res.send(req.params.id)


        const player = await Player.findById(req.params.id)

        if(!player){
            return res.status(404).json({message: 'player not found'})
        }


        res.json(player)


    }catch(error){
        res.status(500).json({message: error.message})

    }
};