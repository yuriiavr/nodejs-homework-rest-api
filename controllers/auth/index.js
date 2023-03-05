const register = require("./register")
const login = require('./login')
const logout = require('./logout')
const subscriptionStatus = require('./subscriptionStatus')
const getCurrent = require('./getCurrent')
const verify = require('./verify')
const resendVerify = require('./resendVerify')

module.exports = {
    register,
    login,
    logout,
    subscriptionStatus,
    getCurrent,
    verify,
    resendVerify,
}