const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req,res) => {
    const{name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: "Sufficient details not provided."})
    }
    try{
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});

        }
        const user = await User.create({name,email,password});
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.authUser = async (req,res) => {
    console.log('reached before destructuring body')
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });


        }else{
            res.status(401).json({message: 'Invalid email and password'});
        }
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message});
    }

};
/*
exports.authUser = async (req,res) => {
    const {email, password} = req.body;
    // Extract the salt from the stored hash
    const saltRounds = 10; // This should match the rounds used during hashing
    const salt = storedHash.substring(0, 29); // Extract the salt from the stored hash

    // Manually hash the entered password using the same salt
    const hashedEnteredPassword = await bcrypt.hash(enteredPassword, salt);

    // Log the manually hashed entered password for debugging
    console.log('Manually Hashed Entered Password:', hashedEnteredPassword);

    // Compare the manually hashed entered password with the stored hash
    const isMatch = hashedEnteredPassword === storedHash;
    console.log('Manual Comparison Result:', isMatch);

    return isMatch;




};
*/