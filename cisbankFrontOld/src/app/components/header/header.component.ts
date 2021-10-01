import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe, formatNumber } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  welcome: string;
  fecha: string;
  hora: string;
  interval: any;
  constructor(
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    let date = new Date();
    let aux = this.datePipe.transform(date, "dd/MM/yyyy-HH:m:s","America/Caracas");
    this.fecha = aux.split("-")[0];
    this.hora = aux.split("-")[1].split(".")[0];
    let hour = parseInt(this.hora.split(":")[0]);
    if (hour < 12 && hour >= 5) {
      this.welcome = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      this.welcome = "Buenas tardes";
    } else if (hour >= 18 || hour < 5) {
      this.welcome = "Buenas noches";
    }

    this.interval = setInterval(() => {
      let date = new Date();
      let aux = this.datePipe.transform(date, "dd/MM/yyyy-HH:m:s","America/Caracas");
      this.fecha = aux.split("-")[0];
      this.hora = aux.split("-")[1].split(".")[0];
      let hour = parseInt(this.hora.split(":")[0]);
      if (hour < 12 && hour >= 5) {
        this.welcome = "Buenos días";
      } else if (hour >= 12 && hour < 18) {
        this.welcome = "Buenas tardes";
      } else if (hour >= 18 || hour < 5) {
        this.welcome = "Buenas noches";
      }
  
    }, 1000);
  }
  ngOnDestroy(){
    this.interval.clearInterval();
  }
}
