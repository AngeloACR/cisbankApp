import { Component, OnInit  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  aMenu: {}; 

  menuOn: boolean;

  constructor(
    private router: Router    
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
	  });
  }

  ngOnInit() {

    this.menuOn = true;
    this.aMenu = {
      aMenu: this.menuOn
    }
  }

  tMenu(menu: any){

    this.menuOn = !this.menuOn;
    this.aMenu = {
      aMenu: this.menuOn
    }
  }

}
