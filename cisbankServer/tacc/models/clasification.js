const mongoose = require("mongoose");
const config = require("../../config/database");

// TAcc Schema
const clasificacionSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  naturaleza: {
    type: String,
    required: true,
  },
  subclasificacion1: [
    {
      naturaleza: {
        type: String,
        required: true,
      },
      codigo: {
        type: String,
        required: true,
      },
      descripcion: {
        type: String,
        required: true,
      },
      subclasificacion2: [
        {
          naturaleza: {
            type: String,
            required: true,
          },
          codigo: {
            type: String,
            required: true,
          },
          descripcion: {
            type: String,
            required: true,
          },
          subclasificacion3: [
            {
              naturaleza: {
                type: String,
                required: true,
              },
              codigo: {
                type: String,
                required: true,
              },
              descripcion: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
});

const Clasificacion = (module.exports = mongoose.model(
  "Clasificacion",
  clasificacionSchema
));

module.exports.getTAccById = function (id, callback) {
  TAcc.findById(id, callback);
};

module.exports.getTAccByName = function (name, callback) {
  const query = { tName: name };
  TAcc.findOne(query, callback);
};

module.exports.getAllTAccs = function (callback) {
  const query = {};
  TAcc.find(query, callback);
};

module.exports.createTAcc = async function (tacc) {
  let newTAcc = new TAcc(tacc);
  let newtacc = newTAcc.save();
  let response = {
    status: true,
    values: newtacc,
  };
  return response;
};

module.exports.deleteTAcc = function (tAccToDelete, callback) {
  const query = { tName: tAccToDelete.tName };
  TAcc.findOneAndRemove(query, callback);
};

module.exports.updateTAcc = function (tAcc, callback) {
  const query = { tName: tAcc.tName };
  TAcc.findOneAndUpdate(
    query,
    {
      $set: {
        tClasf: tAcc.tClasf,
        tType: tAcc.tType,
        tNature: tAcc.tNature,
      },
    },
    callback
  );
};
