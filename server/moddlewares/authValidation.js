const joi = require("joi");

const signupValidation = (req, res, next) =>{
    const schema = joi.object({
        username: joi.string().min(5).max(100).required(),
        password: joi.string().min(5).max(100).required(),
        role : joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "Bad request", error});
    }
    next();

}
const loginValidation = (req, res, next) =>{
    const schema = joi.object({
        username: joi.string().min(5).max(100).required(),
        password: joi.string().min(5).max(100).required()
    })
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message : "Bad request", error});
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}