const mongoose = require('mongoose');
const config = require('../../config/database');

// Move Schema
const CompanySchema = mongoose.Schema({
    name: {
        type: String
    },
    actMonths: [{
        type: String
    }],
    usersType: [{
        type: String
    }],
    taccs: [{
        type: String
    }],
    baccs: [{
        type: String
    }],
});

const company = module.exports = mongoose.model('company', CompanySchema, 'company');

module.exports.getInfo = async function() {
    try {
        const query = {};
        return await company.findOne(query);
    } catch (error) {
        throw error;
    }
};

module.exports.updateBAcc = async function(newBacc) {
    try {
        const query = {};
        return await company.findOneAndUpdate(query, {
            $push: {
                "baccs": newBacc
            }
        });
    } catch (error) {
        throw error;
    }
};

module.exports.removeBAcc = async function(delBacc) {
    try {
        const query = {};
        return await company.findOneAndUpdate(query, {
            $pull: {
                "baccs": delBacc
            }
        });
    } catch (error) {
        throw error;
    }

};

module.exports.updateTAcc = async function(newTacc) {
    try {
        const query = {};
        return await company.findOneAndUpdate(query, {
            $push: {
                "taccs": newTacc
            }
        });
    } catch (error) {
        throw error;
    }
};

module.exports.removeTAcc = async function(delTacc) {
    try {
        const query = {};
        return await company.findOneAndUpdate(query, {
            $pull: {
                "taccs": delTacc
            }
        });
    } catch (error) {
        throw error;
    }

};

module.exports.updateMonth = async function(newMonth) {
    try {
        const query = {};
        return await company.findOneAndUpdate(query, {
            $pull: {
                "actMonths": newMonth
            }
        });
    } catch (error) {
        throw error;
    }
};