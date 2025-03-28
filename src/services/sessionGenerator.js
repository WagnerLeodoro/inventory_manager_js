const crypto = require("node:crypto")

function generateSessionId() {
    return crypto.randomBytes(16).toString('hex')
}

module.exports = {generateSessionId}