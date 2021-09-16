
import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mod1b',
  templateUrl: './mod1b.component.html',
  styleUrls: ['./mod1b.component.css']
})
export class Mod1bComponent implements OnInit {

  openBox: {};
  boxOn: boolean;
  addB: boolean;
  updateB: boolean;
  show: boolean; 

  bank: FormGroup;

  banks = new Array();

  constructor(
    private data: DataHandlerService,
    private fb: FormBuilder
    ) { }
  
  async ngOnInit() {
    this.bank = new FormGroup({
      bAlias: new FormControl(''),
      bBank: new FormControl(''),
      bNumber: new FormControl(''),
      bMail: new FormControl(''),
      bBalance: new FormControl(''),
      bAct: new FormControl(''),
      bAddress: new FormControl(''),
      bPhone: new FormControl(''),
      bEx: new FormControl(''),
      bExPhone: new FormControl(''),
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
  
  openAdd(){
    console.log("here");
    this.addB = true;
    this.updateB = false;
    this.bank.controls['bAlias'].enable();
    this.bank.controls['bBalance'].enable();
    this.flush();
    this.tBox();
  }

  openUpdate(event, bacc){
    this.addB = false;
    this.updateB = true;
    this.bank.controls['bAlias'].disable();
    this.bank.controls['bBalance'].disable();
    this.bank.setValue({
    bAlias: bacc.bAlias,
    bBank: bacc.bBank, 
    bNumber: bacc.bNumber,  
    bBalance: bacc.bBalance,
    bMail: bacc.bMail,
    bAct: bacc.bAct,
    bAddress: bacc.bAddress, 
    bEx: bacc.bEx,  
    bPhone: bacc.bPhone,
    bExPhone: bacc.bExPhone
    });

    this.tBox();
  }

  tBox(){
    this.boxOn = !this.boxOn;
    this.openBox = {
      oBox: this.boxOn
    };
  }

  addBank(){
    var bank = this.bank.value
    this.show = true
    console.log(bank)
    this.data.createBank(bank)
    .subscribe(data => {   // data is already a JSON object
          this.data.updateBs();
          this.tBox();
          this.flush();
          window.location.reload();
    });
  }

  updateBank(){
    this.bank.controls['bAlias'].enable();
    this.bank.controls['bBalance'].enable();
    var bank = this.bank.value
    console.log(bank);
    this.show = true
    this.data.updateBank(bank)
    .subscribe(data => {   // data is already a JSON object
          this.data.updateBs();
          this.tBox();
          this.flush();
          window.location.reload();
    });
  }


  flush(){
    this.bank.setValue({  
    bAlias: '',
    bBank: '', 
    bNumber: '',  
    bBalance: '',
    bMail: '',
    bAct: '', 
    bAddress: '',  
    bPhone: '',
    bEx: '',
    bExPhone: '',
    });
  }

  deleteBank(event, bacc){
    console.log('Deleting bank')
    this.data.deleteBank(bacc)
      .subscribe(data => {   // data is already a JSON object
        this.data.updateBs();
        window.location.reload();
      });
  }

}
