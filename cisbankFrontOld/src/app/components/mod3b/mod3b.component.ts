import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { DatePipe, formatNumber } from '@angular/common';

@Component({
  selector: 'app-mod3b',
  templateUrl: './mod3b.component.html',
  styleUrls: ['./mod3b.component.css']
})
export class Mod3bComponent implements OnInit {

	today = new Date;

	showT: boolean;

  dAccs: {
	tName: string,
	tMonth: string,
	tNature: string,
	tBalance: number,
  }[] = new Array();

	tMonths: string[] = new Array();

  dTotalN: number = 0;
  hTotalN: number = 0;
  disponibilidadN: number = 0;

  hAccs: {
	tName: string,
	tMonth: string,
	tNature: string,
	tBalance: number,
  }[] = new Array();

  constructor(
    private data: DataHandlerService,
    private datePipe: DatePipe
  	) {
  	var month = 0;
  	var year = this.today.getFullYear();
  for( let i = 0; i <= this.today.getMonth(); i++) {
	  var date = new Date(year, i, 1);
  }
		this.tMonths.push(this.datePipe.transform(this.today, 'MMMM'));
  }

  ngOnInit() {
    this.data.updateTs();
    this.data.updateMTs();
    var auxT = this.data.getLocalAccs();
    var auxM = this.data.getLocalMAccs();
    if(auxM == null){
      this.showT = false;
    } else{
      for( let acc of auxM){
        if (acc.tType == "Nominal") {      
           if(acc.tNature == "Debe"){
            this.dTotalN += acc.tBalance;
     //       acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.dAccs.push(acc);
          } else {
            this.hTotalN += acc.tBalance;
       //     acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.hAccs.push(acc);
          }
        }
      }
      this.disponibilidadN = this.dTotalN - this.hTotalN;
      this.showT = true;
    }

  }


}