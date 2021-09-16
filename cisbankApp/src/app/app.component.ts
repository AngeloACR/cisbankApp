import { Component, OnInit, OnChanges  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  islogged: boolean;
  aMenu: {}; 

  menuOn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router    
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
	  });
  }

  ngOnInit() {
    this.islogged = this.auth.isAuthenticated();

  }

  ngOnChanges() {
    this.islogged = this.auth.isAuthenticated();

  }


}
