import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../services/data-handler.service";
import { DatePipe, formatNumber } from "@angular/common";

@Component({
  selector: "app-mod3c",
  templateUrl: "./mod3c.component.html",
  styleUrls: ["./mod3c.component.css"],
})
export class Mod3cComponent implements OnInit {
  today = new Date();

  showT: boolean;

  tMonths: string[] = new Array();

  disponibilidadN: number = 0;
  disponibilidad: number = 0;

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

    let dTotalN = 0;
    let hTotalN = 0;
    let dTotal = 0;
    let hTotal = 0;
    if (auxM == null) {
      this.showT = false;
    } else {
      for (let acc of auxM) {
        if (parseFloat(acc.tDebe)) {
          if (acc.tType == "Nominal") {
            dTotalN += parseFloat(acc.tDebe);
          }
          dTotal += parseFloat(acc.tDebe);
        }
        if (acc.tType == "Nominal") {
          if (parseFloat(acc.tHaber)) {
            hTotalN += parseFloat(acc.tHaber);
          }
          hTotal += parseFloat(acc.tHaber);
        }
      }
      this.disponibilidadN = hTotalN - dTotalN;
      this.disponibilidad = hTotal - dTotal;
      this.showT = true;
    }
  }
}
