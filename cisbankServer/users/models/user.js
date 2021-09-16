const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const Schema = require('mongoose').Schema;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    mail: {
        type: String
    },
    avatarSrc: {
        type: String,
    },
    validToken: {
        type: String,
    },
    validTime: {
        type: Number,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
});



const User = module.exports = mongoose.model("User", userSchema);

module.exports.comparePass = async function(candidatePassword, password) {
    try {
        return await bcrypt.compare(candidatePassword, password);
    } catch (error) {
        throw error;
    }
}
module.exports.hashPass = async function(password) {
    try {
        let salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw error;
    }
}
module.exports.genToken = function(username) {
    try {
        const hash = crypto.createHash('sha1');

        var hrTime = process.hrtime();
        var validTime = hrTime[0] * 1000000 + hrTime[1] / 1000

        var toHash = username + validTime.toString() + environment.vSecret;
        hash.update(toHash);
        return [hash.digest('hex'), validTime]
    } catch (error) {
        throw error;
    }
}

module.exports.addUser = async function(newUser) {
    try {
        let user = await this.findOne({ "mail": newUser.mail });
        if (user) {
            throw new Error('Email already in use');
        } else {
            user = await this.findOne({ "username": newUser.username });
            if (user) {
                throw new Error('Username already in use');
            } else {
                newUser.password = await this.hashPass(newUser.password);
                user = await newUser.save();
                let response = {
                    status: true,
                    values: user
                }
                return response
            }
        }
    } catch (error) {
        throw error;
    }
}
module.exports.authUser = async function(username, password) {
    try {
        let user = await this.findOne({ "username": username })
        if (!user) {
            throw new Error("Username doesn't exist")
        }
        let isMatch = await this.comparePass(password, user.password)
        let auth = {}
        if (isMatch) {
            console.log(user);
            const token = jwt.sign(user.toJSON(), environment.authSecret, {
                expiresIn: 604800 //1 week
            });
            auth = {
                auth: true,
                token: token
            }
        } else {
            auth = {
                auth: false
            }
        }
        return auth;
    } catch (error) {
        throw error;
    }
}
module.exports.deleteUser = async function(username) {
    try {
        const query = { "username": username };
        console.log(username);
        return await this.findOneAndRemove(query);
    } catch (error) {
        throw error;
    }
}
module.exports.updateUser = async function(data) {
    try {
        const query = { '_id': data.id }
        let user = await this.findOne(query);
        user.name = data.name;
        user.avatarSrc = data.avatarSrc;
        user.phone = data.phone;
        user = await user.save();
        let response = {
            status: true,
            values: user
        }
        return response

    } catch (error) {
        throw error;
    }
}
module.exports.getUser = async function(uid) { //Need tons of work
    try {
        const query = { '_id': uid }
        let user = await this.findOne(query);
        let response = {
            status: true,
            values: user
        }
        return response
    } catch (error) {
        throw error;
    }
}
module.exports.getUsers = async function() { //Need tons of work
    try {
        const query = {};
        let users = await this.find(query).select('username type -_id');
        let response = {
            status: true,
            values: users
        }
        return response
    } catch (error) {
        throw error;
    }
}
module.exports.setToken = async function(username) {
    try {
        let tokenData = this.genToken(username);
        const query = { username: username };
        let user = await this.findOneAndUpdate(
            query, {
                $set: {
                    "validEmail": false,
                    "validToken": tokenData[0],
                    "validTime": tokenData[1]
                }
            });
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports.validateUser = async function(username, token) {
    try {
        const hrTime = process.hrtime();
        const thisTime = hrTime[0] * 1000000 + hrTime[1] / 1000
        const maxTime = 3600 * 8 * 1000000;
        const query = { "username": username };

        let user = await this.findOne(query);

        if (thisTime - user.validTime < maxTime) {
            if (user.validToken == token) {
                user = await this.findOneAndUpdate(
                    query, {
                        $set: {
                            "validEmail": true,
                        }
                    });
                return user;
            } else {
                throw new Error('Wrong token');
            }
        } else {
            throw new Error('Token has expired');
        }

    } catch (error) {
        throw error;
    }
}