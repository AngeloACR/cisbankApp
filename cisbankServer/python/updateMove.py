#!/usr/bin/python3.6.9
from pymongo import MongoClient
import sys


global dOut


def connectDB(myDB):
    try:
        connection = MongoClient(myDB)
        return connection
#		taccs = connection.cisbank.TAcc
#		baccs = connection.cisbank.BAcc
#		moves = connection.cisbank.Moves
    except:
        sendResult("Connect Error")


def closeConnect(connection):
    try:
        connection.close()
    except:
        sendResult("Close Error")


def updateB(bId, mId, myDB, newAmmount):
    try:
        bConnect = connectDB(myDB)

        baccs = bConnect.cisbank.baccs
        moves = bConnect.cisbank.moves

        bQuery = {'bAlias': bId}
        mQuery = {'mCode': mId}
        bacc = baccs.find_one(bQuery)
        move = moves.find_one(mQuery)

        auxAmmount = newAmmount - move['mAmmount']

        if move['mSign']:
            newBalance = bacc['bBalance'] + auxAmmount
            mNewAux = move['mOld'] + auxAmmount
        else:
            newBalance = bacc['bBalance'] - auxAmmount
            mNewAux = move['mOld'] - auxAmmount

        bBalance = {"$set": {"bBalance": newBalance}}

        baccs.update_one(bQuery, bBalance)

        bankMoves = []
        bankMoves.extend(bacc['bMoves'])
        moveIndex = bankMoves.index(mId)+1
        bmLength = len(bankMoves)
        auxMoves = bankMoves[moveIndex:bmLength]

        mOldAux = move['mOld']
        if not move['mSign']:
            mNewAux = mOldAux + newAmmount
        else:
            mNewAux = mOldAux - newAmmount

        mOld = {"$set": {"mOld": mOldAux}}
        mNew = {"$set": {"mNew": mNewAux}}

        moves.update_one(mQuery, mOld)
        moves.update_one(mQuery, mNew)

        for mAux in auxMoves:
            mQuery = {'mCode': mAux}
            move = moves.find_one(mQuery)

            mOldAux = mNewAux

            if not move['mSign']:
                mNewAux = mOldAux + move['mAmmount']
            else:
                mNewAux = mOldAux - move['mAmmount']

            mOld = {"$set": {"mOld": mOldAux}}
            mNew = {"$set": {"mNew": mNewAux}}

            moves.update_one(mQuery, mOld)
            moves.update_one(mQuery, mNew)

        closeConnect(bConnect)
        status = True
        return status

    except Exception as ex:
        template = "Exception type: {0} occurred in updateB. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def updateT(tId, mId, myDB, newAmmount):
    try:
        tConnect = connectDB(myDB)

        taccs = tConnect.cisbank.taccs
        moves = tConnect.cisbank.moves

        tQuery = {'tName': tId}
        mQuery = {'mCode': mId}
        tacc = taccs.find_one(tQuery)
        move = moves.find_one(mQuery)

        if not move['mSign']:
            newDebe = tacc['tDebe'] - move['mAmmount'] + newAmmount
            tDebe = {"$set": {"tDebe": newDebe}}
            taccs.update_one(tQuery, tDebe)
            newBalance = tacc['tHaber']-newDebe
        else:
            newHaber = tacc['tHaber'] - move['mAmmount'] + newAmmount
            tHaber = {"$set": {"tHaber": newHaber}}
            taccs.update_one(tQuery, tHaber)
            newBalance = newHaber-tacc['tDebe']

        tBalance = {"$set": {"tBalance": newBalance}}

        taccs.update_one(tQuery, tBalance)

        closeConnect(tConnect)
        status = True
        return status

    except Exception as ex:
        template = "Exception type: {0} occurred in updateT. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        sendResult(message)
        status = False
        return status


def updateMonths(tId, mId, myDB, newAmmount):
    try:
        tConnect = connectDB(myDB)

        moves = tConnect.cisbank.moves
        mtaccs = tConnect.cisbank.mtaccs

        mQuery = {'mCode': mId}
        move = moves.find_one(mQuery)

        mtQuery = {'tName': tId}
        mtacc = mtaccs.find_one(mtQuery)
        if not move['mSign']:
            newDebe = mtacc['tDebe'] - move['mAmmount'] + newAmmount
            tDebe = {"$set": {"tDebe": newDebe}}
            mtaccs.update_one(mtQuery, tDebe)
            newBalance = mtacc['tHaber']-newDebe
        else:
            newHaber = mtacc['tHaber'] - move['mAmmount'] + newAmmount
            tHaber = {"$set": {"tHaber": newHaber}}
            mtaccs.update_one(mtQuery, tHaber)
            newBalance = newHaber-mtacc['tDebe']

        mtBalance = {"$set": {"tBalance": newBalance}}
        mtaccs.update_one(mtQuery, mtBalance)
        mAmmount = {"$set": {"mAmmount": newAmmount}}

        moves.update_one(mQuery, mAmmount)

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

    bId = sys.argv[1]
    tId = sys.argv[2]
    mId = sys.argv[3]
    newAmmount = float(sys.argv[4])
    statusB = updateB(bId, mId, myDB, newAmmount)
    statusT = updateT(tId, mId, myDB, newAmmount)
    statusA = updateMonths(tId, mId, myDB, newAmmount)
    if statusB and statusT and statusA:
        sendResult("Success")
    else:
        sendResult("Error")


# if __name__ == "__main__":
 #   sendResult("Init")
main()
