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
  selector: "app-mod2c",
  templateUrl: "./mod2c.component.html",
  styleUrls: ["./mod2c.component.css"],
})
export class Mod2cComponent implements OnInit {
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

  constructor(private data: DataHandlerService, private datePipe: DatePipe, private fb: FormBuilder) {}

  clasificaciones: any;
  subclasificaciones: any;
  clasificacion: any;
  subclasificacion: any;
  
  setSubclasificacion(){
    this.subclasificaciones = this.clasificacion.subclasificacion; 
  }

  async ngOnInit() {
    this.clasificaciones = await this.data.getClasificaciones();
    this.acc = new FormGroup({
      desc: new FormControl("", [
        // validaciones síncronas
        Validators.required,
      ]),
      naturaleza: new FormControl(""),
      saldo: new FormControl(""),
    });

    this.addT = false;
    this.updateT = false;

    this.data.updateTs();
    this.box1On = false;
    this.box2On = false;
    var auxT = await this.data.getServerAccs();
    if (auxT == null) {
      this.showT = false;
    } else {
      for (let acc of auxT) {
        if (acc.tNature == "Debe") {
          acc.tBalanceD = acc.tBalance; //formatNumber(acc.tBalance,'es-VE') + ' Bs';
        } else {
          acc.tBalanceH = acc.tBalance; //formatNumber(acc.tBalance,'es-VE') + ' Bs';
        }
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
      naturaleza: tacc.tNature,
      saldo: tacc.tBalance,
    });

    this.tBox();
  }

  async selectMove(event, tacc) {
    this.moves.length = 0;
    var aux = await this.data.getServerMoves();
    if (aux == null) {
    } else {
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
          
        let mDate = new Date(move.mDate);
        move['mDateAux'] = mDate
        move.mDate = this.datePipe.transform(mDate, "yyyy-MM-dd");

          this.moves.push(move);
        }
        this.moves.sort(function (a: any, b: any) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return <any>new Date(b.mDateAux) - <any>new Date(a.mDateAux);
        });
      }
      this.showM = true;
    }
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
    acc['tipo']=this.clasificacion;
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
    acc['tipo']=this.clasificacion;

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
    if (tacc.tMoves && tacc.tMoves.length) {
      alert(
        "La cuenta seleccionada tiene movimientos asociados, elimine los movimientos para poder borrar la cuenta"
      );
    } else {
      this.data.deleteAcc(tacc).subscribe((data) => {
        // data is already a JSON object
        this.data.updateTs();
        window.location.reload();
      });
    }
  }

  flush() {
    this.acc.setValue({
      desc: "",
      tipo: "",
      naturaleza: "",
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
