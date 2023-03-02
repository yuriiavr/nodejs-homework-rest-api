const {requestError} = require("../../helpers");
const {User} = require("../../models/user")

const register = async(req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});
    if(user){
        throw requestError(409, 'Email in use')
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

module.exports = register