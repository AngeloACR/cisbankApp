import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { DatePipe, formatNumber } from '@angular/common';

@Component({
  selector: 'app-mod3',
  templateUrl: './mod3.component.html',
  styleUrls: ['./mod3.component.css'],
  providers: [DatePipe]  
})
export class Mod3Component implements OnInit {

	today = new Date;

	showT: boolean;

	tMonths: string[] = new Array();

  dAccs: {
	tName: string,
	tMonth: string,
	tNature: string,
	tBalance: number,
  }[] = new Array();

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
           if(acc.tNature == "Debe"){
            this.dTotalN += acc.tBalance;
    //        acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.dAccs.push(acc);
          } else {
            this.hTotalN += acc.tBalance;
      //      acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.hAccs.push(acc);
          }
      }
      this.disponibilidadN = this.dTotalN - this.hTotalN;
      this.showT = true;
    }

  }

}
