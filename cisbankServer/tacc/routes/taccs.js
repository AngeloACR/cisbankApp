const express = require("express");
const tAccRouter = express.Router();
const TAcc = require("../models/tacc");
const passport = require("passport");
const MTAcc = require("../models/mtacc");
const Company = require("../../general/models/company");
const Move = require("../../moves/models/move");
const async = require("async");

//Create TAcc
tAccRouter.post("/cTAcc", async (req, res, next) => {
  const tName = req.body.tName;
  const tMonth = req.body.tMonth;
  const tClasf = req.body.tClasf;
  const tType = req.body.tType;
  const tNature = req.body.tNature;

  let tacc = {
    tName: tName,
    tClasf: tClasf,
    tNature,
    tBalance: 0,
    tDebe: 0,
    tHaber: 0,
    tType: tType
  };

  let taccResponse = await TAcc.createTAcc(tacc);

  let mtacc = {
    tName: tName,
    tMonth: tMonth,
    tNature,
    tType: tType,
    tBalance: 0,
    tDebe: 0,
    tHaber: 0,
  };
  let mtaccResponse = await MTAcc.createMTAcc(mtacc);
  return res.json({
    success: true,
    msg: "TAcc registered",
  });
});

tAccRouter.post("/csvTAccs", (req, res, next) => {
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
        callback(new Error("Something is wrong, try again in a million years"));
      }
    });
  };

  var createMTAcc = function (callback) {
    MTAcc.createMTAcc(newMTAcc, (mErr, mtAcc) => {
      if (mErr) throw mErr;
      if (mtAcc) {
        callback(null, mtAcc);
      } else {
        callback(new Error("Something is wrong, try again in a million years"));
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
});

//Get TAcc
tAccRouter.post("/gTAcc", (req, res, next) => {
  const tName = req.body.tName;

  TAcc.getTAccByName(tName, (err, tAcc) => {
    if (err) throw err;
    if (!tAcc) {
      return res.json({
        success: false,
        msg: "tAcc not found",
      });
    } else {
      return res.json({
        success: true,
        TAcc: tAcc,
      });
    }
  });
});

// Get all BAccs
tAccRouter.get("/gTAccs", (req, res, next) => {
  TAcc.getAllTAccs((err, tAccs) => {
    if (err) throw err;
    var tMap = [{}];
    var i = 0;
    if (tAccs && tAccs.length) {
      tAccs.forEach(function (tAcc) {
        tMap[i] = tAcc;
        i++;
      });
      return res.json({
        status: true,
        tAccs: tMap,
      });
    } else {
      return res.json({
        status: false,
        tAccs: tMap,
      });
    }
  });
});

//Update BAcc
tAccRouter.post("/uTAcc", (req, res, next) => {
  const tType = req.body.tType;
  const tClasf = req.body.tClasf;
  const tNature = req.body.tNature;
  const tName = req.body.tName;

  let tacc = new TAcc({
    tName: tName,
    tNature,
    tClasf: tClasf,
    tType: tType,
  });

  TAcc.getTAccByName(tName, (err, tAcc) => {
    if (err) throw err;
    if (!tAcc) {
      return res.json({
        success: false,
        msg: "TAcc not found",
      });
    } else {
      TAcc.updateTAcc(tacc, (uErr, uTAcc) => {
        return res.json({
          success: true,
          msg: "TAcc updated",
        });
      });
    }
  });
});

//Delete BAcc
tAccRouter.post("/dTAcc", (req, res, next) => {
  const tName = req.body.tName;

  var findMoves = function (callback) {
    Move.getMovesByTAcc(tName, (dErr, moves) => {
      if (dErr) throw dErr;
      if (moves) {
        callback(null, moves);
      } else {
        callback(new Error("Something is wrong, try again in a million years"));
      }
    });
  };

  var deleteMoves = function (moves, callback) {
    var aux = true;
    moves.forEach(function (move) {
      Move.deleteMove(move, (mErr, status) => {
        if (mErr) aux = false;
      });
    });
    if (aux) {
      callback(null, aux);
    } else {
      callback(new Error("Something is wrong, try again in a million years"));
    }
  };

  var moveThing = function (callback) {
    async.waterfall([findMoves, deleteMoves], function (err, info) {
      if (err) {
        callback(new Error("Something is wrong, try again in a million years"));
      } else {
        callback(null, true);
      }
    });
  };

  var getTAcc = function (status, callback) {
    TAcc.getTAccByName(tName, (cErr, tacc) => {
      if (cErr) throw cErr;
      if (tacc) {
        callback(null, tacc);
      } else {
        callback(new Error("Something is wrong, try again in a million years"));
      }
    });
  };


  var deleteTAcc = function (tacc, callback) {
    TAcc.deleteTAcc(tacc, (dErr, dtAcc) => {
      if (dErr) throw dErr;
      if (dtAcc) {
        callback(null, dtAcc);
      } else {
        callback(new Error("Something is wrong, try again in a million years"));
      }
    });
  };

  async.waterfall(
    [moveThing, getTAcc, deleteTAcc],
    function (err, info) {
      if (err) {
        return res.json({
          success: false,
          msg: err,
        });
      } else {
        return res.json({
          success: true,
          msg: "TAcc deleted",
        });
      }
    }
  );
});

tAccRouter.get("/gmTAccs", (req, res, next) => {
  MTAcc.getAllMTAccs((err, mtAccs) => {
    if (err) throw err;
    var tMap = [{}];
    var i = 0;
    if (mtAccs && mtAccs.length) {
      mtAccs.forEach(function (mtAcc) {
        tMap[i] = mtAcc;
        i++;
      });
      return res.json({
        status: true,
        mtAccs: tMap,
      });
    } else {
      return res.json({
        status: false,
      });
    }
  });
});

module.exports = tAccRouter;
