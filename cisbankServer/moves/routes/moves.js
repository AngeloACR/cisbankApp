const express = require("express");
const moveRouter = express.Router();
const Move = require("../models/move");
const DMove = require("../models/dmove");
const passport = require("passport");
const spawn = require("child_process").spawn;
const path = require("path")
//Create Move
moveRouter.post("/cMove", (req, res, next) => {
  //	const mCode = Move.estimatedDocumentCount();					//INGENIARSE UN METODO DE ASIGNACION DE MCODE
  const mAmmount = req.body.mAmmount;
  const mBAcc = req.body.mBAcc;
  const mReference = req.body.mReference;
  const mTAcc = req.body.mTAcc;
  const mSign = req.body.mSign;
  const mDesc = req.body.mDesc;
  const mDate = req.body.mDate;
  console.log(req.body);
  let newMove = new Move({
    mAmmount: mAmmount,
    mBAcc: mBAcc,
    mReference,
    mDate,
    mTAcc: mTAcc,
    mDesc: mDesc,
    mSign: mSign,
  });
  console.log(newMove);
  DMove.getDMoveByDate(mDate, (err, dMove) => {
    if (err) throw err;
    if (!dMove) {
      let newDMove = new DMove({
        mDate: mDate,
        mDebe: 0,
        mHaber: 0,
        mTotal: 0,
        mClose: false,
      });

      DMove.createDMove(newDMove, (cErr, nDMove) => {
        if (cErr) {
        }
      });
    }
  });

  Move.createMove(newMove, (cErr, move) => {
    if (cErr) {
      return res.json({
        success: false,
        msg: cErr,
      });
    }

    mCode = Move.getCode(move._id, mBAcc, mTAcc);
    Move.setCode(move, mCode, (cErr, fMove) => {
      try {
        const bId = mBAcc;
        const tId = mTAcc;
        const mId = mCode;
        console.log(bId)
        console.log(tId)
        console.log(mId)
        //			const mDay = mDate;
        const pythonPath = "./python/updateBalance.py";
        const updatePath  = path.join("/root/cisbankApp/cisbankServer/", pythonPath);
        //const updatePath  = path.resolve(pythonPath)
        //			const updateOptions = [updatePath, bId, tId, mId, mDay];
        const updateOptions = [updatePath, bId, tId, mId];

        const updateProcess = spawn("python3", updateOptions);

        var myData;

        updateProcess.stdout.on("data", (data) => {
          console.log(data);
          myData = data;
        });
        updateProcess.on("error", (error) => {
          console.log(error);
        });

        updateProcess.on("close", (code) => {
          console.log(code);
          return res.json({
            success: true,
            msg: myData,
          });
        });

        /*		return res.json({
                success: true, 
                console.log(this.today.getMinutes());
                msg: 'Move registered',
                move: move
            });
            */
      } catch (e) {
        console.log(e);
      }
    });
  });
});

//Get Move
moveRouter.post("/gMove", (req, res, next) => {
  const mCode = req.body.mCode;
  Move.getMoveByCode(mCode, (err, move) => {
    if (err) throw err;
    if (!move) {
      return res.json({
        success: false,
        msg: "Move not found",
      });
    } else {
      return res.json({
        success: true,
        Move: move,
      });
    }
  });
});

//Get Daily Move
moveRouter.post("/gDMove", (req, res, next) => {
  const mDate = req.body.mDate;
  DMove.getDMoveByDate(mDate, (err, dMove) => {
    if (err) throw err;
    if (!dMove) {
      return res.json({
        success: false,
        msg: "DMove not found",
      });
    } else {
      return res.json({
        success: true,
        DMove: dMove,
      });
    }
  });
});

// Get all Moves
moveRouter.get("/gMoves", (req, res, next) => {
  Move.getAllMoves((err, moves) => {
    if (err) throw err;
    var mMap = [{}];
    var i = 0;
    if (moves && moves.length) {
      moves.forEach(function (move) {
        mMap[i] = move;
        i++;
      });
      return res.json({
        status: true,
        moves: mMap,
      });
    } else {
      return res.json({
        status: false,
      });
    }
  });
});

//Update BAcc
moveRouter.post("/uMove", (req, res, next) => {
  const mCode = req.body.mCode;
  const newAmmount = req.body.mAmmount;
  const mBAcc = req.body.mBAcc;
  const mTAcc = req.body.mTAcc;

  let uMove = new Move({
    mCode: mCode,
    mBAcc: mBAcc,
    mTAcc: mTAcc,
  });

  Move.getMoveByCode(mCode, (err, move) => {
    if (err) throw err;
    if (!move) {
      return res.json({
        success: false,
        msg: "Move not found",
      });
    } else {
      Move.updateMove(uMove, newAmmount, (uErr, uMove) => {
        return res.json({
          success: true,
          msg: "Move updated",
        });
      });
    }
  });
});

//Delete BAcc
moveRouter.post("/dMove", (req, res, next) => {
  const mCode = req.body.mCode;

  Move.getMoveByCode(mCode, (cErr, move) => {
    if (cErr) throw cErr;
    if (!move) {
      return res.json({
        status: false,
        msg: "Move not found",
      });
    } else {
      Move.deleteMove(move, (mErr, status) => {
        if (mErr) {
          return res.json({
            success: false,
            msg: "Somtehing happenned",
          });
        }
        return res.json({
          success: true,
          msg: "move deleted",
        });
      });
    }
  });
});

module.exports = moveRouter;
