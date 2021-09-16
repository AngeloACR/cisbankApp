import { Injectable } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class DataHandlerService {
  today = new Date();
  testSource = "http://localhost:3400";
  prodSource = "";
  addressBAccs = "/baccs";
  addressTAccs = "/taccs";
  addressMoves = "/moves";
  addressMTAccs = "/mtaccs";

  mySource = this.testSource;
  //mySource = this.prodSource

  constructor(
    private papa: Papa,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  createSomething(body, thing) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var address = this.mySource;

    switch (thing) {
      case "bank": {
        address = address + this.addressBAccs + "/cBAcc";
        break;
      }
      case "tacc": {
        address = address + this.addressBAccs + "/cTAcc";
        break;
      }
      default: {
        address = address + this.addressBAccs + "/cMove";
        break;
      }
    }

    return this.http.post(address, body, { headers: headers });
  }

  createBank(bank) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      bAlias: bank.bAlias,
      bBank: bank.bBank,
      bNumber: bank.bNumber,
      bMail: bank.bMail,
      bBalance: bank.bBalance,
      bAct: bank.bAct,
      bAddress: bank.bAddress,
      bPhone: bank.bPhone,
      bEx: bank.bEx,
      bExPhone: bank.bExPhone,
    };

    var address = this.mySource + this.addressBAccs + "/cBAcc";

    return this.http.post(address, body, { headers: headers });
  }

  updateBank(bank) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      bAlias: bank.bAlias,
      bBank: bank.bBank,
      bNumber: bank.bNumber,
      bBalance: bank.bBalance,
      bAct: bank.bAct,
      bAddress: bank.bAddress,
      bPhone: bank.bPhone,
      bEx: bank.bEx,
      bExPhone: bank.bExPhone,
    };

    return this.http.post(this.mySource + this.addressBAccs + "/uBAcc", body, {
      headers: headers,
    });
  }

  storeBanks(banks) {
    localStorage.setItem("banks", JSON.stringify(banks));
  }

  getLocalBanks() {
    var banks = JSON.parse(localStorage.getItem("banks"));
    return banks;
  }

  getServerBanks() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let address = this.mySource + this.addressBAccs + "/gBAccs";
    return new Promise<any>((resolve, reject) => {
      this.http.get(address, { headers: headers }).subscribe((data: any) => {
        // data is already a JSON object
        if (data["status"]) {
          this.storeBanks(data["banks"]);
          resolve(data.banks);
        } else {
          localStorage.removeItem("banks");
        }
      });
    });
  }

  deleteBank(bank) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      bAlias: bank.bAlias,
    };

    return this.http.post(this.mySource + this.addressBAccs + "/dBAcc", body, {
      headers: headers,
    });
  }

  createAcc(tacc) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let tMonth = this.datePipe.transform(this.today, "MMMM");

    var tType;

    if (
      tacc.tipo == "Activo" ||
      tacc.tipo == "Pasivo" ||
      tacc.tipo == "Capital"
    ) {
      tType = "Real";
    } else {
      tType = "Nominal";
    }

    var body = {
      tName: tacc.desc,
      tClasf: tacc.tipo,
      tType: tType,
      tMonth: tMonth,
      tNature: tacc.naturaleza,
    };

    return this.http.post(this.mySource + this.addressTAccs + "/cTAcc", body, {
      headers: headers,
    });
  }

  updateAcc(tacc) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var tType;

    if (
      tacc.tipo == "Activo" ||
      tacc.tipo == "Pasivo" ||
      tacc.tipo == "Capital"
    ) {
      tType = "Real";
    } else {
      tType = "Nominal";
    }

    var body = {
      tName: tacc.desc,
      tClasf: tacc.tipo,
      tType: tType,
      tNature: tacc.naturaleza,
    };

    return this.http.post(this.mySource + this.addressTAccs + "/uTAcc", body, {
      headers: headers,
    });
  }

  storeAccs(accs) {
    localStorage.removeItem("accs");
    localStorage.setItem("accs", JSON.stringify(accs));
  }

  getServerAccs() {

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let address = this.mySource + this.addressTAccs + "/gTAccs";
    return new Promise<any>((resolve, reject) => {
      this.http.get(address, { headers: headers }).subscribe((data: any) => {
        // data is already a JSON object
        if (data["status"]) {
          this.storeBanks(data["tAccs"]);
          resolve(data.tAccs);
        } else {
          localStorage.removeItem("tAccs");
        }
      });
    });
  }

  getLocalAccs() {
    var accs = JSON.parse(localStorage.getItem("accs"));
    return accs;
  }

  deleteAcc(tacc) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      tName: tacc.tName,
    };

    return this.http.post(this.mySource + this.addressTAccs + "/dTAcc", body, {
      headers: headers,
    });
  }

  storeMAccs(maccs) {
    localStorage.removeItem("maccs");
    localStorage.setItem("maccs", JSON.stringify(maccs));
  }

  getServerMAccs() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    return this.http.get(this.mySource + this.addressTAccs + "/gmTAccs", {
      headers: headers,
    });
  }

  getLocalMAccs() {
    var maccs = JSON.parse(localStorage.getItem("maccs"));
    return maccs;
  }

  createMove(move, today) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let mDate = today
    if(move.mDate) mDate = move.mDate
    var body = {
      mAmmount: move.mAmmount,
      mBAcc: move.mBAcc,
      mTAcc: move.mTAcc,
      mDesc: move.mDesc,
      mSign: move.mSign,
      mDate,
    };

    return this.http.post(this.mySource + this.addressMoves + "/cMove", body, {
      headers: headers,
    });
  }

  deleteMove(move) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      mCode: move.mCode,
    };
    return this.http.post(this.mySource + this.addressMoves + "/dMove", body, {
      headers: headers,
    });
  }

  updateMove(move) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    var body = {
      mAmmount: move.mAmmount,
      mBAcc: move.mBAcc,
      mTAcc: move.mTAcc,
      mDesc: move.mDesc,
      mSign: move.mSign,
      mCode: move.mCode,
    };

    return this.http.post(this.mySource + this.addressMoves + "/uMove", body, {
      headers: headers,
    });
  }

  storeMoves(move) {
    localStorage.removeItem("moves");
    localStorage.setItem("moves", JSON.stringify(move));
  }

  getServerMoves() {

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    let address = this.mySource + this.addressMoves + "/gMoves";
    return new Promise<any>((resolve, reject) => {
      this.http.get(address, { headers: headers }).subscribe((data: any) => {
        // data is already a JSON object
        if (data["status"]) {
          this.storeBanks(data["moves"]);
          resolve(data.moves);
        } else {
          localStorage.removeItem("moves");
        }
      });
    });
  }

  getLocalMoves() {
    var moves = JSON.parse(localStorage.getItem("moves"));
    return moves;
  }

  storeAccCsv(csvText) {
    var accKeys = [];
    var accs = [];
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let options = {
      complete: (results, file) => {
        for (let i in results.data[0]) {
          accKeys.push(results.data[0][i]);
        }

        for (let i = 1; i < results.data.length; i++) {
          if (results.data[i][0] == null || results.data[i][0] == "") {
            continue;
          }
          var auxAcc = {};
          for (let j = 0; j < accKeys.length; j++) {
            auxAcc[accKeys[j]] = results.data[i][j];
          }
          accs.push(auxAcc);
        }

        var body = {
          accs: accs,
        };

        return this.http.post(
          this.mySource + this.addressTAccs + "/csvTAccs",
          body,
          { headers: headers }
        );
        //this.storeAccs(accs);
      },
    };

    this.papa.parse(csvText, options);
  }

  storeMoveCsv(csvText) {
    var moveKeys = [];
    var moves = [];
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    let options = {
      complete: (results, file) => {
        for (let i in results.data[0]) {
          moveKeys.push(results.data[0][i]);
        }

        for (let i = 1; i < results.data.length; i++) {
          if (results.data[i][0] == null || results.data[i][0] == "") {
            continue;
          }
          var auxMove = {};
          for (let j = 0; j < moveKeys.length; j++) {
            auxMove[moveKeys[j]] = results.data[i][j];
          }
          moves.push(auxMove);
        }
        var body = {
          moves: moves,
        };

        return this.http.post(
          this.mySource + this.addressMoves + "/csvMoves",
          body,
          { headers: headers }
        );
        //				this.storeMoves(moves);
      },
    };

    this.papa.parse(csvText, options);
  }

  updateTs() {
    this.getServerAccs()
  }

  updateMTs() {
    this.getServerMAccs().subscribe((data) => {
      // data is already a JSON object
      if (data["status"]) {
        this.storeMAccs(data["mtAccs"]);
      } else {
        localStorage.removeItem("mtAccs");
      }
    });
  }

  updateBs() {
    this.getServerBanks();
  }

  updateMs() {
    this.getServerMoves()
  }
}
