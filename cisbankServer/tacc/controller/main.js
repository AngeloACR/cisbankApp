const Clasificacion = require("../models/clasification");
const mainHandler = {
  crearClasificacion: async function (req, res) {
    try {
      let clasificaciones = req.body.data;
      let response = [];
      let length = clasificaciones.length;
      for (let i = 0; i < length; i++) {
        const clasificacion = clasificaciones[i];

        let aux = new Clasificacion(clasificacion);
        let data = await aux.save();
        response.push(data);
      }
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json(e.toString());
    }
  },
  getClasificaciones: async function (req, res) {
    try {
      let query = {};
      let clasificaciones = await Clasificacion.find(query);
      res.status(200).json(clasificaciones);
    } catch (e) {
      res.status(400).json(e.toString());
    }
  },
};

module.exports = mainHandler;
