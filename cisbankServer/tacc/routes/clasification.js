const express = require("express");
const router = express.Router();
const controller = "../controller/main"
//Create TAcc
router.post("/", controller.crearClasificacion);
router.get("/", controller.getClasificaciones);

module.exports = router;