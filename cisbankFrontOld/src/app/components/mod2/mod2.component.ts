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
  selector: "app-mod2",
  templateUrl: "./mod2.component.html",
  styleUrls: ["./mod2.component.css"],
})
export class Mod2Component implements OnInit {
  openBox: {};
  openBox2: {};
  box1On: boolean;
  box2On: boolean;

  showT: boolean;
  showM: boolean;

  acc: FormGroup;

  addT: boolean;
  updateT: boolean;

  accs: {
    tName: string;
    tType: string;
    tNature: string;
    tBalance: number;
    tBalanceD: number;
    tBalanceH: number;
  }[] = new Array();

  moves: {
    mDate: string;
    mDesc: string;
    mCode: string;
    mNature: string;
    mAmmount: number;
    mOld: number;
    mNew: number;
  }[] = new Array();

  text: any;

  constructor(private data: DataHandlerService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.acc = new FormGroup({
      desc: new FormControl("", [
        // validaciones síncronas
        Validators.required,
      ]),
      tipo: new FormControl(""),
      saldo: new FormControl(""),
    });

    this.addT = false;
    this.updateT = false;

    this.box1On = false;
    this.box2On = false;

    var auxT = await this.data.getServerAccs();
    if (auxT == null) {
      this.showT = false;
    } else {
      for (let acc of auxT) {
        /*         if(acc.tNature == "Debe"){
          acc.tBalanceD = acc.tBalance //formatNumber(acc.tBalance,'es-VE') + ' Bs';
        } else {
          acc.tBalanceH = acc.tBalance //formatNumber(acc.tBalance,'es-VE') + ' Bs';
        }     */
        this.accs.push(acc);
      }
      this.showT = true;
    }

    this.showM = false;
  }

  openAdd() {
    this.addT = true;
    this.updateT = false;
    this.acc.controls["desc"].enable();
    this.flush();
    this.tBox();
  }

  openUpdate(event, tacc) {
    this.addT = false;
    this.updateT = true;
    this.acc.controls["desc"].disable();
    this.acc.setValue({
      desc: tacc.tName,
      tipo: tacc.tClasf,
      saldo: tacc.tBalance,
    });

    this.tBox();
  }

  async selectMove(event, tacc) {
    if (!this.showM) {
      this.moves.length = 0;
      var aux = await this.data.getServerMoves();
      console.log(aux);
      for (let move of aux) {
        //        move.mAmmount =  formatNumber(move.mAmmount,'es-VE');
        //      move.mOld =  formatNumber(move.mOld,'es-VE');
        //    move.mNew =  formatNumber(move.mNew,'es-VE');
        if (tacc == move.mTAcc) {
          if (move.mSign) {
            move.mNature = "+";
          } else {
            move.mNature = "-";
          }
          move.mDate = move.mDate.substring(0, 10);
          this.moves.push(move);
        }
      }
      if (this.moves.length == 0) return;
    }
    this.showM = !this.showM;
  }

  tBox() {
    this.box1On = !this.box1On;
    this.openBox = {
      oBox: this.box1On,
    };
  }

  tCsv() {
    this.box2On = !this.box2On;
    this.openBox2 = {
      oBox: this.box2On,
    };
  }

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

  deleteAcc(event, tacc) {
    this.data.deleteAcc(tacc).subscribe((data) => {
      // data is already a JSON object
      this.data.updateTs();
      window.location.reload();
    });
  }

  flush() {
    this.acc.setValue({
      desc: "",
      tipo: "",
      saldo: "",
    });
  }

  addCsv(input) {
    const reader = new FileReader();
    this.showT = true;
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      this.data.storeAccCsv(text);
      this.tCsv();
      window.location.reload();
    };
  }
}
