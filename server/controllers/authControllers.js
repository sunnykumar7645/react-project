const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const register = async (req, res) =>{
    try {
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password : hashedPassword, role});
        await newUser.save();
        res.status(201).json({message: `User is registered with username : ${username}.`});
    } catch (error) {
        res.status(500).json({message: `something went wront..`});
    }
}

const login = async (req, res) =>{
    try {
        const {username, password} = req.body; 
        const user = await User.findOne({username})
        console.log(user)
        if(!user){
            res.status(404).json({message: `User with ${username} not found.`});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid credential"});
        }
        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECREAT,
            {expiresIn: "1h"}
        )
        res.status(200).json({token});
    } 
    catch (error) {
        res.status(500).json({message: `something went wront..`});

    }
}

module.exports = {
    register,
    login,
};