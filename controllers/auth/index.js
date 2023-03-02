const register = require("./register")
const login = require('./login')
const logout = require('./logout')
const subscriptionStatus = require('./subscriptionStatus')
const getCurrent = require('./getCurrent')

module.exports = {
    register,
    login,
    logout,
    subscriptionStatus,
    getCurrent
}