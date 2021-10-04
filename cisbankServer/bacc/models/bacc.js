const mongoose = require('mongoose');
const config = require('../../config/database');

// BAcc Schema
const BAccSchema = mongoose.Schema({
    bAlias: {
        type: String,
        required: true
    },
    bCode: {
        type: String,
        required: true
    },
    bCoin: {
        type: String
    },
    bBalance: {
        type: Number,
        required: true
    },
    bNumber: {
        type: String,
        required: true
    },
    bMail: {
        type: String,
        required: true
    },
    bBank: {
        type: String,
        required: true
    },
    bMoves: [{
        type: String
    }],
    bAct: {
        type: String
    },
    bAddress: {
        type: String,
    },
    bPhone: {
        type: String,
        required: true
    },
    bEx: {
        type: String
    },
    bExPhone: {
        type: String
    }
});

const BAcc = module.exports = mongoose.model('BAcc', BAccSchema);

module.exports.getBAccById = async function (id) {
    try {
        const query = { '_id': id }
        let bacc = await this.findOne(query);
        if (!bacc) {
            throw new Error("No existe ese bacno")
        }
        bacc = {
            id: bacc.id,
            bAlias: bAcc.bAlias,
            bNumber: bAcc.bNumber,
            bCode: bAcc.bCode,
            bBank: bAcc.bBank,
            bAct: bAcc.bAct
        }
        let fields = ['Id', 'Alias', 'Numero de cuenta', 'Banco', 'Status']
        let response = {
            status: true,
            values: bacc,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.getBAccByAlias = async function (bAlias) {
    try {
        const query = { 'bAlias': bAlias }
        let bacc = await this.findOne(query);
        if (!bacc) {
            throw new Error("No existe ese bacno")
        }
        bacc = {
            id: bacc.id,
            bAlias: bacc.bAlias,
            bCode: bAcc.bCode,
            bNumber: bacc.bNumber,
            bBank: bacc.bBank,
            bAct: bacc.bAct
        }
        let fields = ['Id', 'Alias', 'Numero de cuenta', 'Banco', 'Status']
        let response = {
            status: true,
            values: bacc,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.getBacc = async function (bAlias) { //Need tons of work
    try {
        const query = { 'bAlias': bAlias }
        let bacc = await this.findOne(query);
        if (!bacc) {
            throw new Error("No existe ese banco")
        }
        bacc = {
            id: bacc.id,
            bAlias: bacc.bAlias,
            bCode: bAcc.bCode,
            bNumber: bacc.bNumber,
            bBank: bacc.bBank,
            bAct: bacc.bAct
        }
        let fields = ['Id', 'Alias', 'Numero de cuenta', 'Banco', 'Status']
        let response = {
            status: true,
            values: bacc,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.getAllBAccs = async function () {
    try {
        const query = {}
        let baccs = await this.find(query);
        if (!baccs) {
            throw new Error("No hay bancos registrados")
        }
        var bMap = [{}];
        var i = 0;
/*         baccs.forEach(function (bacc) {
            bMap[i] = {
                id: bacc.id,
                bAlias: bacc.bAlias,
                bNumber: bacc.bNumber,
                bBank: bacc.bBank,
                bAct: bacc.bAct
            };
            i++;
        }); */

        let fields = ['Id', 'Alias', 'Numero de cuenta', 'Banco', 'Status']
        let response = {
            status: true,
            values: baccs,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.createBAcc = async function (bacc) {
    try {
        let newBAcc = new BAcc(bacc);
        const query = { 'bAlias': newBAcc.bAlias }
        let bank = await this.findOne(query);
        if (!bank) {
            bank = await newBAcc.save();
            let response = {
                status: true,
                values: bank
            }
            return response
        } else {
            throw new Error("Ya existe este alias");
        }
    } catch (error) {
        throw error;
    }
};

module.exports.deleteBAcc = async function (bAlias) {
    try {
        const query = { bAlias: bAlias }
        return await this.findOneAndRemove(query);
    } catch (error) {
        throw error;
    }
};

module.exports.updateBAcc = function (bAcc, callback) {
    const query = { bAlias: bAcc.bAlias };
    console.log('updating this: ' + query);
    BAcc.findOneAndUpdate(query, {
        $set: {
            "bAct": bAcc.bAct,
            "bNumber": bAcc.bNumber,
            "bBank": bAcc.bBank
        }
    },
        callback);
};