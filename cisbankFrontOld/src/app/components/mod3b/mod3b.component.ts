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
  sColor: any = {};

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
  async ngOnInit() {
    this.data.updateTs();
    this.data.updateMTs();
    var auxT = await this.data.getServerAccs();
    var auxM = await this.data.getServerMAccs();
    if (auxM == null) {
      this.showT = false;
    } else {
      for (let acc of auxM) {
        let month = this.datePipe.transform(this.today, "MMMM");
        if (month == acc.tMonth) {
          if (acc.tType == "Nominal") {
            if (parseFloat(acc.tDebe)) {
              this.dTotalN += parseFloat(acc.tDebe);
              this.dAccs.push(acc);
            }
            if (parseFloat(acc.tHaber)) {
              this.hTotalN += parseFloat(acc.tHaber);
              this.hAccs.push(acc);
            }
          }
        }
      }
      this.disponibilidadN = this.hTotalN - this.dTotalN;
      if (this.disponibilidadN >= 0) {
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
      this.showT = true;
    }
  }
}
