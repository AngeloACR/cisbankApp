#!/usr/bin/python3.6.9
from pymongo import MongoClient
import sys

#global connection

#global baccs
#global taccs
#global moves

#global bacc
#global tacc
#global move

global dOut


def connectDB(myDB):
    try:
        connection = MongoClient(myDB)
        return connection

    except:
        sendResult("Connect Error")


def closeConnect(connection):
    try:
        connection.close()
    except:
        sendResult("Close Error")


def updateB(bId, mId, myDB):
    try:
        bConnect = connectDB(myDB)

        baccs = bConnect.cisbank.baccs
        moves = bConnect.cisbank.moves

        bQuery = {'bAlias': bId}
        mQuery = {'mCode': mId}
        bacc = baccs.find_one(bQuery)
        move = moves.find_one(mQuery)
        if move['mSign']:
            newBalance = bacc['bBalance'] + move['mAmmount']
        else:
            newBalance = bacc['bBalance'] - move['mAmmount']

        oldB = bacc['bBalance']

        newMoves = []

        newMoves.extend(bacc['bMoves'])
        newMoves.append(mId)

        mOld = {"$set": {"mOld": bacc['bBalance']}}
        mNew = {"$set": {"mNew": newBalance}}

        bBalance = {"$set": {"bBalance": newBalance}}
        bMoves = {"$set": {"bMoves": newMoves}}

        baccs.update_one(bQuery, bBalance)
        baccs.update_one(bQuery, bMoves)

        moves.update_one(mQuery, mOld)
        moves.update_one(mQuery, mNew)

        closeConnect(bConnect)
        status = True
        return status

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def updateT(tId, mId, myDB):
    try:
        tConnect = connectDB(myDB)

        taccs = tConnect.cisbank.taccs
        moves = tConnect.cisbank.moves

        tQuery = {'tName': tId}
        mQuery = {'mCode': mId}
        tacc = taccs.find_one(tQuery)
        move = moves.find_one(mQuery)

        if not move['mSign']:
            newDebe = tacc['tDebe'] + move['mAmmount']
            tDebe = {"$set": {"tDebe": newDebe}}
            taccs.update_one(tQuery, tDebe)
            newBalance = tacc['tHaber']-newDebe
        else:
            newHaber = tacc['tHaber'] + move['mAmmount']
            tHaber = {"$set": {"tHaber": newHaber}}
            taccs.update_one(tQuery, tHaber)
            newBalance = newHaber-tacc['tDebe']

        newMoves = []
        newMoves.extend(tacc['tMoves'])
        newMoves.append(mId)

        tMoves = {"$set": {"tMoves": newMoves}}

        tBalance = {"$set": {"tBalance": newBalance}}
        taccs.update_one(tQuery, tBalance)
        taccs.update_one(tQuery, tMoves)
        closeConnect(tConnect)
        status = True
        return status

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def totalizeMove(mDate, mId, myDB):
    try:
        tConnect = connectDB(myDB)

        dmoves = tConnect.cisbank.dmoves
        moves = tConnect.cisbank.moves

        dQuery = {'mDate': mDate}
        dmove = dmoves.find_one(dQuery)
        mQuery = {'mCode': mId}
        move = moves.find_one(mQuery)

        if not move['mSign']:
            newDebe = dmove['mDebe'] + move['mAmmount']
            mDebe = {"$set": {"mDebe": newDebe}}
            dmoves.update_one(dQuery, mDebe)
            newTotal = dmove['mTotal'] + move['mAmmount']
            mTotal = {"$set": {"mTotal": newTotal}}
            dmoves.update_one(dQuery, mTotal)
        else:
            newHaber = dmove['mHaber'] + move['mAmmount']
            mHaber = {"$set": {"mHaber": newHaber}}
            dmoves.update_one(dQuery, mHaber)
            newTotal = dmove['mTotal'] - move['mAmmount']
            mTotal = {"$set": {"mTotal": newTotal}}
            dmoves.update_one(dQuery, mTotal)

        closeConnect(tConnect)
        status = True
        return status

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def totalizeMonths(tId, mId, myDB):
    try:
        tConnect = connectDB(myDB)

        moves = tConnect.cisbank.moves
        mtaccs = tConnect.cisbank.mtaccs

        mQuery = {'mCode': mId}
        move = moves.find_one(mQuery)

        mtQuery = {'tName': tId}
        mtacc = mtaccs.find_one(mtQuery)
        if not move['mSign']:
            newDebe = mtacc['tDebe'] + move['mAmmount']
            tDebe = {"$set": {"tDebe": newDebe}}
            mtaccs.update_one(mtQuery, tDebe)
            newBalance = mtacc['tHaber']-newDebe
        else:
            newHaber = mtacc['tHaber'] + move['mAmmount']
            tHaber = {"$set": {"tHaber": newHaber}}
            mtaccs.update_one(mtQuery, tHaber)
            newBalance = newHaber-mtacc['tDebe']
        
        mtBalance = {"$set": {"tBalance": newBalance}}

        mtaccs.update_one(mtQuery, mtBalance)
        closeConnect(tConnect)
        status = True
        return status

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def sendResult(dOut):
    print(dOut)
    sys.stdout.flush()


def main():
    myDB = "mongodb://localhost:27017/cisbank"
    #myDB = "mongodb://angeloacr:cisbankDataBase47@ds051595.mlab.com:51595/cisbank"
    sendResult("mongodb init")

    bId = sys.argv[1]
    tId = sys.argv[2]
    mId = sys.argv[3]
    sendResult(bId)
    sendResult(tId)
    sendResult(mId)
    #mDate = sys.argv[4]
    statusB = updateB(bId, mId, myDB)
    sendResult(statusB)
    statusT = updateT(tId, mId, myDB)
    sendResult(statusT)
    #statusM = totalizeMove(mDate, mId, myDB)
    statusA = totalizeMonths(tId, mId, myDB)
    if statusB and statusT and statusA:
        sendResult("Success")
    else:
        sendResult("Error")


if __name__ == "__main__":
 #   sendResult("Init")
    main()
