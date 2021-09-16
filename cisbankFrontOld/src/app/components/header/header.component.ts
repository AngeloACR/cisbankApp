import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today = new Date;
  welcome: string;
  fecha = this.today.toISOString().replace("T", "/").replace("Z", " ")
  constructor() { }

  ngOnInit() {
    let hour = this.today.getHours();
    if( hour < 12 && hour >= 5) {
      this.welcome = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      this.welcome = "Buenas tardes";
    } else if (hour >= 18 || hour < 5) {
      this.welcome = "Buenas noches";
    }

  }

}
