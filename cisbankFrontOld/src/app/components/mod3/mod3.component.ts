import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../services/data-handler.service";
import { DatePipe, formatNumber } from "@angular/common";

@Component({
  selector: "app-mod3",
  templateUrl: "./mod3.component.html",
  styleUrls: ["./mod3.component.css"],
  providers: [DatePipe],
})
export class Mod3Component implements OnInit {
  today = new Date();

  showT: boolean;

  tMonths: string[] = new Array();

  dAccs: {
    tName: string;
    tMonth: string;
    tNature: string;
    tBalance: number;
  }[] = new Array();

  dTotalN: number = 0;
  hTotalN: number = 0;
  disponibilidadN: number = 0;

  hAccs: {
    tName: string;
    tMonth: string;
    tNature: string;
    tBalance: number;
  }[] = new Array();

  constructor(private data: DataHandlerService, private datePipe: DatePipe) {
    var year = this.today.getFullYear();
/*     for (let i = 0; i <= this.today.getMonth(); i++) {
      var date = new Date(year, i, 1);
      let month = this.datePipe.transform(date, "MMMM");
      month = month.charAt(0).toUpperCase() + month.slice(1);
      this.tMonths.push(month);
    } */
    
    let month = this.datePipe.transform(this.today, "MMMM");
    month = month.charAt(0).toUpperCase() + month.slice(1);
    this.tMonths.push(month);
  }

  async ngOnInit() {
    var auxT = await this.data.getServerAccs();
    var auxM = await this.data.getServerMAccs();
    console.log(auxM)
    if (auxM == null) {
      this.showT = false;
    } else {
      for (let acc of auxM) {
        console.log(acc.tDebe)
          this.dTotalN += parseFloat(acc.tDebe);
          //        acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
          this.dAccs.push(acc);
          this.hTotalN += parseFloat(acc.tHaber);
          //      acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
          this.hAccs.push(acc);
      }
      this.disponibilidadN = this.hTotalN - this.dTotalN ;
      this.showT = true;
    }
  }
}
