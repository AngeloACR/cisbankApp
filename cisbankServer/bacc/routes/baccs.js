const express = require("express");
const baccRouter = express.Router();
const BAcc = require("../models/bacc");
const Move = require("../../moves/models/move");
const Company = require("../../general/models/company");
const auth = require("../../users/auth/auth");
const async = require("async");

//Create BAcc
baccRouter.post("/cBAcc", async (req, res, next) => {
  try {

    let bacc = {
      bAlias: req.body.bAlias,
      bBank: req.body.bBank,
      bBalance: 0,
      bNumber: req.body.bNumber,
      bCode: req.body.bCode,
      bMail: req.body.bMail,
      bAct: req.body.bAct,
      bAddress: req.body.bAddress,
      bPhone: req.body.bPhone,
      bEx: req.body.bEx,
      bExPhone: req.body.bExPhone,
    };

    let results = await BAcc.createBAcc(bacc);
    let response = await Company.updateBAcc(bacc.bAlias);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.toString());
  }
});

baccRouter.post("/", async (req, res, next) => {
  try {
    let bacc = {
      bAlias: req.body.bAlias,
      bBank: req.body.bBank,
      bBalance: 0,
      bNumber: req.body.bNumber,
      bAct: req.body.bAct,
      bCode: req.body.bCode,
      bAddress: req.body.bAddress,
      bPhone: req.body.bPhone,
      bEx: req.body.bEx,
      bExPhone: req.body.bExPhone,
    };

    let newBAcc = new BAcc(bacc);
    let results = await BAcc.createBAcc(newBAcc);
    let response = await Company.updateBAcc(bacc.bAlias);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.toString());
  }
});

// Get Banks
baccRouter.get("/", auth, async (req, res, next) => {
  try {
    let response = await BAcc.getAllBAccs();
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.toString());
  }
});

// Delete bank
baccRouter.delete("/", auth, async (req, res, next) => {
  try {
    const jsonItem = req.query.item;
    let item = JSON.parse(jsonItem);
    let moves = await Move.getMovesByBAcc(item);
    moves.forEach(async function (move) {
      await Move.deleteMove(move);
    });
    await BAcc.getBAccByAlias(item);
    await Company.removeBAcc(item);
    let response = await BAcc.deleteBAcc(item);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.toString());
  }
});

// Update bank
baccRouter.put("/", auth, async (req, res, next) => {
  try {
    let bacc = {
      bAlias: req.body.bAlias,
      bBank: req.body.bBank,
      bCode: req.body.bCode,
      bBalance: 0,
      bNumber: req.body.bNumber,
      bAct: req.body.bAct,
      bAddress: req.body.bAddress,
      bPhone: req.body.bPhone,
      bEx: req.body.bEx,
      bExPhone: req.body.bExPhone,
    };

    let updateBAcc = new BAcc(bacc);

    let result = await BAcc.getBAccByAlias(bacc.bAlias);
    let response = await BAcc.updateBAcc(updateBAcc);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.toString());
  }
});

//Get BAcc
baccRouter.post("/gBAcc", (req, res, next) => {
  const bAlias = req.body.bAlias;

  BAcc.getBAccByAlias(bAlias, (err, bAcc) => {
    if (err) throw err;
    if (!bAcc) {
      return res.json({
        success: false,
        msg: "BAcc not found",
      });
    } else {
      return res.json({
        success: true,
        BAcc: bAcc,
      });
    }
  });
});

// Get all BAccs
baccRouter.get("/gBAccs", async (req, res, next) => {
  let banks = (await BAcc.getAllBAccs()).values;
  var bMap = [{}];
  var i = 0;
  if (banks && banks.length) {
    banks.forEach(function (bank) {
      bMap[i] = bank;
      i++;
    });
    return res.json({
      status: true,
      banks: bMap,
    });
  } else {
    return res.json({
      status: false,
      banks: bMap,
    });
  }
});

//Update BAcc
baccRouter.post("/uBAcc", (req, res, next) => {
  const bAlias = req.body.bAlias;
  const bBank = req.body.bBank;
  const bBalance = req.body.bBalance;
  const bNumber = req.body.bNumber;
  const bAct = req.body.bAct;
  const bAddress = req.body.bAddress;
  const bPhone = req.body.bPhone;
  const bCode = req.body.bCode;
  const bEx = req.body.bEx;
  const bExPhone = req.body.bExPhone;

  let uBAcc = new BAcc({
    bAlias: bAlias,
    bBank: bBank,
    bBalance: bBalance,
    bNumber: bNumber,
    bAct: bAct,
    bAddress: bAddress,
    bPhone: bPhone,
    bEx: bEx,
    bExPhone: bExPhone,
  });

  BAcc.getBAccByAlias(bAlias, (err, bank) => {
    if (err) throw err;
    if (!bank) {
      return res.json({
        success: false,
        msg: "BAcc not found",
      });
    } else {
      BAcc.updateBAcc(uBAcc, (uErr, ubacc) => {
        if (uErr) throw uErr;
        return res.json({
          success: true,
          msg: "BAcc updated",
        });
      });
    }
  });
});

//Delete BAcc
baccRouter.post("/dBAcc", (req, res, next) => {
  const bAlias = req.body.bAlias;
  var findMoves = function (callback) {
    Move.getMovesByBAcc(bAlias, (dErr, moves) => {
      if (dErr) throw dErr;
      if (moves) {
        callback(null, moves);
      } else {
        callback(new Error("1Something is wrong, try again in a million years"));
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
      callback(new Error("2Something is wrong, try again in a million years"));
    }
  };
  var moveThing = function (callback) {
    async.waterfall([findMoves, deleteMoves], function (err, info) {
      if (err) {
        callback(new Error("3Something is wrong, try again in a million years"));
      } else {
        callback(null, true);
      }
    });
  };
  var getBAcc = function (status, callback) {
    BAcc.getBAccByAlias(bAlias, (cErr, bacc) => {
      if (cErr) throw cErr;
      if (bacc) {
        callback(null, bacc);
      } else {
        callback(new Error("4Something is wrong, try again in a million years"));
      }
    });
  };
  var deleteBAcc = function (bacc, callback) {
    BAcc.deleteBAcc(bacc.bAlias, (dErr, dbAcc) => {
      if (dErr) throw dErr;
      if (dbAcc) {
        callback(null, dbAcc);
      } else {
        callback(new Error("5Something is wrong, try again in a million years"));
      }
    });
  };

  async.waterfall(
    [moveThing, getBAcc,  deleteBAcc],
    function (err, info) {
      if (err) {
        return res.json({
          success: false,
          msg: err,
        });
      } else {
        return res.json({
          success: true,
          msg: "BAcc deleted",
        });
      }
    }
  );

});

module.exports = baccRouter;
