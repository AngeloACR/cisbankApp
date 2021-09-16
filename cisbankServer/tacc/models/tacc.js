const mongoose = require('mongoose');
const config = require('../../config/database');

// TAcc Schema
const TAccSchema = mongoose.Schema({
	tName: {
		type: String,
		required: true
	},
	tBalance: {
		type: Number,
		required: true
	},
	tClasf: {
		type: String,
		required: true
	},
	tType: {
		type: String,
		required: true
	},
	tDebe: {
		type: Number,
	},
	tHaber: {
		type: Number,
	},
	tMoves:[{
		type: String
	}]
});

const TAcc = module.exports = mongoose.model('TAcc', TAccSchema);

module.exports.getTAccById = function(id, callback){
	TAcc.findById(id, callback);
};

module.exports.getTAccByName = function(name, callback){
	const query = {tName: name};
	TAcc.findOne(query, callback);
};

module.exports.getAllTAccs = function(callback){
	const query = {};
	TAcc.find(query, callback);
};

module.exports.createTAcc = async function(tacc){
	let newTAcc = new TAcc(tacc);
	let newtacc = newTAcc.save();
	let response = {
		status: true,
		values: newtacc
	}
	return response
};

module.exports.deleteTAcc = function(tAccToDelete, callback){
	const query = {tName: tAccToDelete.tName}
	TAcc.findOneAndRemove(query, callback);	
};

module.exports.updateTAcc = function(tAcc, callback){
	const query = {tName: tAcc.tName};
	TAcc.findOneAndUpdate(query, 
    { $set: { 
		"tClasf": tAcc.tClasf,
		"tType": tAcc.tType,
    }},
	callback);
};