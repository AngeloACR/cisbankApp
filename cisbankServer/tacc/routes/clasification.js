const express = require("express");
const router = express.Router();
const controller = require("../controller/main")
//Create TAcc
router.post("/", controller.crearClasificacion);
router.get("/", controller.getClasificaciones);
router.post("/csv", controller.crearClasificacionCSV);

module.exports = router;