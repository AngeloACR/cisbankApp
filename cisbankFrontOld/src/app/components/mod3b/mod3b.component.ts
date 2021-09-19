import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../services/data-handler.service";
import { DatePipe, formatNumber } from "@angular/common";

@Component({
  selector: "app-mod3b",
  templateUrl: "./mod3b.component.html",
  styleUrls: ["./mod3b.component.css"],
})
export class Mod3bComponent implements OnInit {
  today = new Date();

  showT: boolean;

  dAccs: {
    tName: string;
    tMonth: string;
    tNature: string;
    tBalance: number;
  }[] = new Array();

  tMonths: string[] = new Array();

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
    /* for (let i = 0; i <= this.today.getMonth(); i++) {
      var date = new Date(year, i, 1);
      let month = this.datePipe.transform(date, "MMMM");
      month = month.charAt(0).toUpperCase() + month.slice(1);
      this.tMonths.push(month);
    } */

        let month = this.datePipe.transform(this.today, "MMMM");
    month = month.charAt(0).toUpperCase() + month.slice(1);
    this.tMonths.push(month);

  }
  ngOnInit() {
    this.data.updateTs();
    this.data.updateMTs();
    var auxT = this.data.getLocalAccs();
    var auxM = this.data.getLocalMAccs();
    if (auxM == null) {
      this.showT = false;
    } else {
      for (let acc of auxM) {
        if (acc.tType == "Nominal") {
            this.dTotalN += acc.tDebe;
            //       acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.dAccs.push(acc);
            this.hTotalN += acc.tHaber;
            //     acc.tBalance = formatNumber(acc.tBalance, 'es-VE');
            this.hAccs.push(acc);
        }
      }
      this.disponibilidadN = this.dTotalN - this.hTotalN;
      this.showT = true;
    }
  }
}
