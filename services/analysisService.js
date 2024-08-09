const Player = require('../models/Player')
const Match = require('../models/Match');

const getPlayerPerformance = async (playerId) => {
    const player = await Player.findById(playerId);
    if(!player){
        throw new Error('Player not found');
    }
    const totalGoals = player.performance.reduce((sum, perf) => sum + perf.goalsScored, 0);
    const totalAssists = player.performance.reduce((sum, perf) => sum + perf.assists, 0);
    const totalMinutes = player.performance.reduce((sum, perf) => sum + perf.minutesPlayed, 0)

    return {
        totalGoals,
        totalAssists,
        totalMinutes
    };
};


/*
for get match prediction
    const countA  = matches.map((item) => {
        if(item.score.split('-')[0] > item.score.split('-')[1]){
            console.log('the match won is by teamA real maidraid ', item)
            return item
        }else{
            return null;
        }
    })
    console.log("cOunt a = ",countA)

     */


/*
const getMatchPrediction = async(teamA, teamB) => {
    const matches = await Match.find({
        $or: [
            {teamA, teamB},
            {teamA: teamB, teamB: teamA}
        ]

    });


    const winsA = matches.filter(match => match.score.split('-')[0] > match.score.split('-')[1]).length;
    const winsB = matches.filter(match => match.score.split('-')[1] > match.score.split('-')[0]).length;
    const draws = matches.filter(match => match.score.split('-')[0] === match.score.split('-')[1]).length;
    const totalMatches = matches.length;

    return{
        winsA,
        winsB,
        draws,
        totalMatches
    };


}

 */


const getMatchPrediction = async (teamA, teamB) => {
    const matches = await Match.find({
        $or: [
            { teamA, teamB }, // Matches where teamA is teamA and teamB is teamB
            { teamA: teamB, teamB: teamA } // Matches where teamA is teamB and teamB is teamA
        ]
    });
    //console.log(matches.length)
    if (matches.length === 0){
        return 'The selected team is not found.';
    }

    // Function to calculate wins, draws, and total matches
    const calculateMatchStats = (matches, teamA, teamB) => {
        let winsA = 0;
        let winsB = 0;
        let draws = 0;

        matches.forEach(match => {
            const [scoreA, scoreB] = match.score.split('-').map(Number);
            //console.log( match.teamA, teamA, 'scores::::::::', scoreA,"++", scoreB)
            //console.log('match.teamB & teamB', match.teamB, teamB )
            if (match.teamA === teamA && match.teamB === teamB) {

                if (scoreA > scoreB) {
                    winsA++;
                } else if (scoreB > scoreA) {
                    winsB++;
                } else {
                    draws++;
                }
            } else if (match.teamA === teamB && match.teamB === teamA) {
                if (scoreB > scoreA) {
                    winsA++;
                } else if (scoreA > scoreB) {
                    winsB++;
                } else {
                    draws++;
                }
            }
        });

        const totalMatches = matches.length;

        return { winsA, winsB, draws, totalMatches };
    };

    // Calculate stats based on teamA and teamB
    const { winsA, winsB, draws, totalMatches } = calculateMatchStats(matches, teamA, teamB);

    //console.log(winsA, winsB)
    return {
        winsA,
        winsB,
        draws,
        totalMatches
    };
};




module.exports = {
    getPlayerPerformance,
    getMatchPrediction
}