import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../services/data-handler.service";
import { DatePipe, formatNumber } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-mod2b",
  templateUrl: "./mod2b.component.html",
  styleUrls: ["./mod2b.component.css"],
  providers: [DatePipe],
})
export class Mod2bComponent implements OnInit {
  today = new Date();
  mClose: boolean;
  mOpen: boolean;

  todayS: string;

  addM: boolean;
  updateM: boolean;

  openBox: {};
  openBox2: {};
  openBox3: {};
  sColor: {};
  box1On: boolean;
  box2On: boolean;
  box3On: boolean;

  show: boolean;
  showAdd: boolean;
  showClose: boolean;
  showOpen: boolean;

  mDate: string;
  mReference: string;
  mDesc: string;
  mAmmount: number;
  mBAcc: string;
  mTAcc: string;
  mSign: boolean;

  moves: {
    mDesc: string;
    mBAcc: string;
    mTAcc: string;
    mReference: string;
    mNature: string;
    mAmmount: number;
    mMas: number;
    mMenos: number;
    mOld: number;
    mNew: number;
  }[] = new Array();

  mDebe: number;
  mHaber: number;
  mNeto: number;

  banks = [];
  accs = [];

  text: any;

  move: FormGroup;

  constructor(
    private data: DataHandlerService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.todayS = this.datePipe.transform(this.today, "yyyy-MM-dd");
  }

  async ngOnInit() {
    this.getState();
    this.acc = new FormGroup({
      desc: new FormControl('', [
    // validaciones síncronas
    Validators.required
  ]),
      tipo: new FormControl(''),
      saldo: new FormControl('')
    });

    this.move = new FormGroup({
      mDate: new FormControl(""),
      mDesc: new FormControl(""),
      mAmmount: new FormControl(""),
      mReference: new FormControl(""),
      mBAcc: new FormControl(""),
      mTAcc: new FormControl(""),
      mCode: new FormControl(""),
      mSign: new FormControl(""),
    });

    if (!this.mOpen && !this.mClose) {
      this.mClose = true;
      this.mOpen = false;
    }

    if (this.mOpen) {
      this.showAdd = false;
      this.showClose = false;
      this.showOpen = true;
    } else if (this.mClose) {
      this.showAdd = true;
      this.showClose = true;
      this.showOpen = false;
    }
    this.data.updateMs();
    this.box1On = false;
    this.box2On = false;
    this.mDebe = 0;
    this.mHaber = 0;
    this.mNeto = 0;

    this.banks = (await this.data.getServerBanks()).map((bank) => bank.bAlias);
    this.accs = (await this.data.getServerAccs()).map((acc) => acc.tName);
    var aux = await this.data.getServerMoves();
    var mDate;
    if (aux == null) {
      this.show = false;
    } else {
      for (let move of aux) {
        mDate = new Date(move.mDate);
        move.mDate = this.datePipe.transform(mDate, "yyyy-MM-dd");
        //        move.mDate = move.mDate.substring(0,10);
        //          move.mOld = formatNumber(move.mOld, 'es-VE');
        //        move.mNew = formatNumber(move.mNew, 'es-VE');
        if (move.mDate == this.todayS) {
          if (move.mSign) {
            move.mNature = "+";
            move.mMas = move.mAmmount; //.toString() + ' Bs';
            //          move.mMas = formatNumber(move.mAmmount,'es-VE') + ' Bs';
            this.mDebe += move.mAmmount;
          } else {
            move.mNature = "-";
            move.mMenos = move.mAmmount; //.toString() + ' Bs';
            //        move.mMenos = formatNumber(move.mAmmount,'es-VE') + ' Bs';
            this.mHaber += move.mAmmount;
          }
          this.moves.push(move);
        }
      }
      this.mNeto = this.mDebe - this.mHaber;
      // this.mDebeS = formatNumber(this.mDebe, 'es-VE');
      //     this.mHaberS = formatNumber(this.mHaber, 'es-VE');
      //  this.mNetoS = formatNumber(this.mNeto, 'es-VE');

      if (this.mNeto >= 0) {
        this.sColor = {
          sGreen: true,
          sRed: false,
        };
      } else {
        this.sColor = {
          sRed: true,
          sGreen: false,
        };
      }

      this.show = true;
    }
  }

  openAdd() {
    this.addM = true;
    this.updateM = false;
    this.flush();
    this.tBox();
  }

  addT: boolean;
  updateT: boolean;
  openAddCuentasT() {
    this.addT = true;
    this.updateT = false;
    this.flush();
    this.tBox3();
  }

  openUpdate(event, move) {
    this.addM = false;
    this.updateM = true;
    this.move.setValue({
      mDesc: move.mDesc,
      mAmmount: move.mAmmount,
      mReference: move.mReference,
      mBAcc: move.mBAcc,
      mTAcc: move.mTAcc,
      mSign: move.mSign,
      mCode: move.mCode,
    });

    this.tBox();
  }

  tBox() {
    this.box1On = !this.box1On;
    this.openBox = {
      oBox: this.box1On,
    };
  }
  tBox3() {
    this.box3On = !this.box3On;
    this.openBox3 = {
      oBox: this.box3On,
    };
  }

  tCsv() {
    this.box2On = !this.box2On;
    this.openBox2 = {
      oBox: this.box2On,
    };
  }

movimientoExtemporaneo: boolean = false;
fechaMovimiento: boolean;

  addMove() {
    var mDesc = this.move.value.mDesc;
    var mAmmount = this.move.value.mAmmount;
    var mReference = this.move.value.mReference;
    var mBAcc = this.move.value.mBAcc;
    var mTAcc = this.move.value.mTAcc;
    var mSign = this.move.value.mSign;
    //var mSign = this.getSign(mTAcc);
    let mDate = this.movimientoExtemporaneo? this.fechaMovimiento : this.todayS
    var move = {
      mDesc: mDesc,
      mAmmount: mAmmount,
      mReference,
      mDate,
      mBAcc: mBAcc,
      mTAcc: mTAcc,
      mSign: mSign,
    };
    this.show = true;
    this.data.createMove(move).subscribe((data) => {
      console.log(data)
      // data is already a JSON object
      this.tBox();
      this.flush();
      window.location.reload();
    });
  }

  updateMove() {
    var mDesc = this.move.value.mDesc;
    var mReference = this.move.value.mReference;
    var mAmmount = this.move.value.mAmmount;
    var mBAcc = this.move.value.mBAcc;
    var mTAcc = this.move.value.mTAcc;
    var mCode = this.move.value.mCode;

    var mSign = this.getSign(mTAcc);

    var move = {
      mDesc: mDesc,
      mAmmount: mAmmount,
      mReference,
      mBAcc: mBAcc,
      mTAcc: mTAcc,
      mSign: mSign,
      mCode: mCode,
    };

    this.show = true;
    this.data.updateMove(move).subscribe((data) => {
      // data is already a JSON object
      this.data.updateMs();
      this.tBox();
      this.flush();
      window.location.reload();
    });
  }

  getSign(tName) {
    var auxT = this.data.getLocalAccs();
    if (auxT == null) {
      console.log("no T accounts");
    } else {
      for (let acc of auxT) {
        if (tName == acc.tName) {
          if (acc.tNature == "Debe") {
            return true;
          } else if (acc.tNature == "Haber") {
            return false;
          }
        }
      }
    }
  }

  flush() {
    this.mDesc = null;
    this.mAmmount = null;
    this.mBAcc = null;
    this.mTAcc = null;
  }

  addCsv(input) {
    const reader = new FileReader();
    this.show = true;
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      this.data.storeMoveCsv(text);
      this.tCsv();
      window.location.reload();
    };
  }

  cDay() {
    this.mOpen = true;
    this.mClose = false;
    this.storeState(this.mOpen, this.mClose);
    window.location.reload();
  }
  oDay() {
    this.mOpen = false;
    this.mClose = true;
    this.storeState(this.mOpen, this.mClose);
    window.location.reload();
  }

  storeState(mOpen, mClose) {
    localStorage.setItem("mOpen", JSON.stringify(mOpen));
    localStorage.setItem("mClose", JSON.stringify(mClose));
  }

  getState() {
    this.mOpen = JSON.parse(localStorage.getItem("mOpen"));
    this.mClose = JSON.parse(localStorage.getItem("mClose"));
  }

  deleteMove(event, move) {
    this.data.deleteMove(move).subscribe((data) => {
      // data is already a JSON object
      this.data.updateMs();
      window.location.reload();
    });
  }

  acc: FormGroup;
  showT: boolean;

  addAcc() {
    var acc = this.acc.value;

    this.showT = true;
    this.data.createAcc(acc).subscribe((data) => {
      // data is already a JSON object
      this.data.updateTs();
      this.tBox();
      this.flush();
      window.location.reload();
    });
  }

  updateAcc() {
    this.acc.controls["desc"].enable();
    var acc = this.acc.value;

    this.showT = true;
    this.data.updateAcc(acc).subscribe((data) => {
      // data is already a JSON object
      this.data.updateTs();
      this.tBox();
      this.flush();
      window.location.reload();
    });
  }
}
