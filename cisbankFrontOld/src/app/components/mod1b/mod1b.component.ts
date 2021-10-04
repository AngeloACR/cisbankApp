import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../services/data-handler.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-mod1b",
  templateUrl: "./mod1b.component.html",
  styleUrls: ["./mod1b.component.css"],
})
export class Mod1bComponent implements OnInit {
  openBox: {};
  boxOn: boolean;
  addB: boolean;
  updateB: boolean;
  show: boolean;

  bank: FormGroup;

  banks = new Array();

  constructor(private data: DataHandlerService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.bank = new FormGroup({
      bAlias: new FormControl("", Validators.required),
      bBank: new FormControl("", Validators.required),
      bNumber: new FormControl("", Validators.required),
      bCode: new FormControl("", Validators.required),
      bMail: new FormControl("", Validators.required),
      bBalance: new FormControl(""),
      bAct: new FormControl(""),
      bCoin: new FormControl(""),
      bAddress: new FormControl("", Validators.required),
      bPhone: new FormControl("", Validators.required),
      bEx: new FormControl("", Validators.required),
      bExPhone: new FormControl("", Validators.required),
    });

    this.addB = false;
    this.updateB = false;

    //this.data.updateBs();
    this.boxOn = false;
    this.banks = await this.data.getServerBanks();
    this.show = true;
    /*   	if(aux == null){
  		this.show = false;
  	} else{
    	for( let bacc of aux){
        this.banks.push(bacc);
      }
    } */
  }

  get fBanco() {
    return this.bank.controls;
  }
  openAdd() {
    console.log("here");
    this.addB = true;
    this.updateB = false;
    this.bank.controls["bBalance"].enable();
    this.flush();
    this.tBox();
  }

  openUpdate(event, bacc) {
    this.addB = false;
    this.updateB = true;
    this.bank.controls["bBalance"].disable();
    this.bank.setValue({
      bAlias: bacc.bAlias,
      bCode: bacc.bCode,
      bBank: bacc.bBank,
      bNumber: bacc.bNumber,
      bBalance: bacc.bBalance,
      bMail: bacc.bMail,
      bCoin: bacc.bCoin,
      bAct: bacc.bAct,
      bAddress: bacc.bAddress,
      bEx: bacc.bEx,
      bPhone: bacc.bPhone,
      bExPhone: bacc.bExPhone,
    });

    this.tBox();
  }
  catchBankErrors() {
    let aux1 = this.fBanco.bAlias.errors
      ? this.fBanco.bAlias.errors.required
      : false;
    let aux2 = this.fBanco.bBank.errors
      ? this.fBanco.bBank.errors.required
      : false;
    let aux3 = this.fBanco.bNumber.errors
      ? this.fBanco.bNumber.errors.required
      : false;
    let aux4 = this.fBanco.bMail.errors
      ? this.fBanco.bMail.errors.required
      : false;
    let aux5 = this.fBanco.bAddress.errors
      ? this.fBanco.bAddress.errors.required
      : false;
    let aux6 = this.fBanco.bEx.errors ? this.fBanco.bEx.errors.required : false;
    let aux7 = this.fBanco.bPhone.errors
      ? this.fBanco.bPhone.errors.required
      : false;
    let aux8 = this.fBanco.bExPhone.errors
      ? this.fBanco.bExPhone.errors.required
      : false;
    let aux9 = this.fBanco.bCode.errors
      ? this.fBanco.bCode.errors.required
      : false;

    let error = aux1 || aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
    return error;
  }
  tBox() {
    this.boxOn = !this.boxOn;
    this.openBox = {
      oBox: this.boxOn,
    };
  }

  addBank() {
    var bank = this.bank.value;
    this.show = true;
    let error = this.catchBankErrors();
    if (error) {
      alert(
        "Algunos campos son inválidos. Por favor, revise el formulario e intente de nuevo"
      );
    } else {
      this.data.createBank(bank).subscribe((data) => {
        // data is already a JSON object
        this.data.updateBs();
        this.tBox();
        this.flush();
        window.location.reload();
      });
    }
  }

  updateBank() {
    this.bank.controls["bBalance"].enable();
    var bank = this.bank.value;
    console.log(bank);
    this.show = true;
    let error = this.catchBankErrors();
    this.data.updateBank(bank).subscribe((data) => {
      // data is already a JSON object
      this.data.updateBs();
      this.tBox();
      this.flush();
      window.location.reload();
    });
  }

  flush() {
    this.bank.setValue({
      bAlias: "",
      bBank: "",
      bNumber: "",
      bBalance: "",
      bMail: "",
      bAct: "",
      bCode: "",
      bAddress: "",
      bPhone: "",
      bEx: "",
      bExPhone: "",
    });
  }

  deleteBank(event, bacc) {
    console.log("Deleting bank");
    this.data.deleteBank(bacc).subscribe((data) => {
      // data is already a JSON object
      this.data.updateBs();
      window.location.reload();
    });
  }
}
