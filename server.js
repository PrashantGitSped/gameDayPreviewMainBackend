const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const playerRoutes = require('./routes/playerRoutes')
const matchRoutes = require('./routes/matchRoutes')
const authRoutes = require('./routes/authRoutes')
const analysisRoutes = require('./routes/analysisRoutes')
const path = require('path');
dotenv.config()
connectDB()

const app = express();



app.use(cors());
app.use(bodyParser.json())



app.use('/api/players', playerRoutes)
app.use('/api/matches', matchRoutes)

app.use('/api/auth', authRoutes)
app.use('/api/analysis', analysisRoutes)


app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//
/*
const bcrypt = require('bcryptjs');

async function debugPasswordComparisons(storedHash, enteredPassword) {
    // Extract the salt from the stored hash
    const saltRounds = 10; // This should match the rounds used during hashing
    //const salt = storedHash.substring(0, 29); // Extract the salt from the stored hash
    const salt = await bcrypt.genSalt(10)





    // Compare the manually hashed entered password with the stored hash

    const isMatchCompare = await bcrypt.compare(enteredPassword, storedHash)

    console.log('bcrypt Comparison Result:', isMatchCompare);

    return isMatchCompare;
}


async function debugPasswordComparison(storedHash, enteredPassword) {
    // Log the entered password and stored hash for debugging
    console.log('Entered Password:', enteredPassword);
    console.log('Stored Hash from DB:', storedHash);

    try {
        // Use bcrypt's compare method to check if the passwords match
        const isMatch = await bcrypt.compare(enteredPassword, storedHash);

        // Log the comparison result for debugging
        console.log('bcrypt Comparison Result:', isMatch);

        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}


const storedHash = '$2a$10$5meA3fAKeXghpIIIOX1rzu88iieFycGlxJgneUNgPwok8FJG5yj4W'; // Example stored hash from the database
const enteredPassword = '123456'; // The password entered by the user

debugPasswordComparisons(storedHash, enteredPassword);

*/


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))