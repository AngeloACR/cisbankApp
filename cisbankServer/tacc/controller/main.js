const Clasificacion = require("../models/clasification");
const cuentasTUploader = require("../middleware/cuentasTUploader");
const clasificacionUploader = require("../middleware/clasificacionUploader");
const csv = require("csv-parse");
const fs = require("fs");
const path = require("path");

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
  crearClasificacionCSV: async function (req, res) {
    try {
      let clasificacionesAux = [];
      await clasificacionUploader(req, res);
      let filepath = `/home/angeloacr/Proyectos/cisbank/app/cisbankServer/uploads/clasificacion/${req.file.originalname}`;
      fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", (data) => clasificacionesAux.push(data))
        .on("error", (error) => {
          throw new Error(error.message);
        })
        .on("end", async () => {
          let response = [];
          let clasificaciones = []
          clasificacionesAux.splice(0, 1);
          let clasificacionesKeys = clasificacionesAux[0];
          clasificacionesAux.forEach((row, i) => {
            if(i != 0){

              let aux = {}
              aux[clasificacionesKeys[0]] = row[0]
              aux[clasificacionesKeys[1]] = row[1]
              aux[clasificacionesKeys[2]] = row[2]
              clasificaciones.push(aux);
            }
          });
          let clasificacionesPadre = clasificaciones.filter(
            (clasificacion) => clasificacion.codigo.length == 1
          );
          for (let i = 0; i < clasificacionesPadre.length; i++) {
            clasificacionesPadre[i]["subclasificacion1"] =
              clasificaciones.filter(
                (clasificacion) =>
                  clasificacion.codigo.split(".").length == 2 &&
                  clasificacion.codigo.split(".")[0] ==
                    clasificacionesPadre[i].codigo
              );
            for (
              let j = 0;
              j < clasificacionesPadre[i]["subclasificacion1"].length;
              j++
            ) {
              clasificacionesPadre[i]["subclasificacion1"][j][
                "subclasificacion2"
              ] = clasificaciones.filter(
                (clasificacion) =>
                  clasificacion.codigo.split(".").length == 3 &&
                  `${clasificacion.codigo.split(".")[0]}.${
                    clasificacion.codigo.split(".")[1]
                  }` == clasificacionesPadre[i]["subclasificacion1"][j].codigo
              );
              for (
                let k = 0;
                k <
                clasificacionesPadre[i]["subclasificacion1"][j][
                  "subclasificacion2"
                ].length;
                k++
              ) {
                clasificacionesPadre[i]["subclasificacion1"][j][
                  "subclasificacion2"
                ][k]["subclasificacion3"] = clasificaciones.filter(
                  (clasificacion) =>
                    clasificacion.codigo.split(".").length == 4 &&
                    `${clasificacion.codigo.split(".")[0]}.${
                      clasificacion.codigo.split(".")[1]
                    }.${clasificacion.codigo.split(".")[2]}` ==
                      clasificacionesPadre[i]["subclasificacion1"][j][
                        "subclasificacion2"
                      ][k].codigo
                );
              }
            }
            let aux = new Clasificacion(clasificacionesPadre[i]);
            let data = await aux.save();
            response.push(data);
          }
          res.status(200).json(response);
        });
    } catch (e) {
      res.status(400).json(e.toString());
    }
  },
  crearCuentaTCSV: async function (req, res) {
    try {
      await cuentasTUploader(req, res);

      const tName = req.body.tName;
      const tMonth = req.body.tMonth;
      const tClasf = req.body.tClasf;
      const tType = req.body.tType;
      const tNature = req.body.tNature;

      let newTAcc = new TAcc({
        tName: tName,
        tClasf: tClasf,
        tBalance: 0,
        tNature,
        tType: tType,
      });

      let newMTAcc = new MTAcc({
        tName: tName,
        tMonth: tMonth,
        tNature,
        tType: tType,
        tBalance: 0,
      });

      var createTAcc = function (callback) {
        TAcc.createTAcc(newTAcc, (cErr, tAcc) => {
          if (cErr) throw cErr;
          if (tAcc) {
            callback(null, tAcc);
          } else {
            callback(
              new Error("Something is wrong, try again in a million years")
            );
          }
        });
      };

      var createMTAcc = function (callback) {
        MTAcc.createMTAcc(newMTAcc, (mErr, mtAcc) => {
          if (mErr) throw mErr;
          if (mtAcc) {
            callback(null, mtAcc);
          } else {
            callback(
              new Error("Something is wrong, try again in a million years")
            );
          }
        });
      };

      async.series([createTAcc, createMTAcc], function (err, info) {
        if (err) {
          return res.json({
            success: false,
            msg: err,
          });
        } else {
          return res.json({
            success: true,
            msg: "TAcc registered",
          });
        }
      });

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(400).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
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
