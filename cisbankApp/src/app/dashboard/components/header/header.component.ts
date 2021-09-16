import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DbHandlerService } from '../../services/db-handler.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today = new Date;
  welcome: string;
  constructor(
    private dbHandler: DbHandlerService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let hour = this.today.getHours();
    if (hour < 12 && hour >= 5) {
      this.welcome = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      this.welcome = "Buenas tardes";
    } else if (hour >= 18 || hour < 5) {
      this.welcome = "Buenas noches";
    }

  }

  actualizar() {
    let refreshList = [
      {
        endpoint: '/baccs/',
        name: 'banks'
      },
      {
        endpoint: '/moves/gMoves',
        name: 'moves'
      }
    ]
    let dataArray = [];
    console.log('Aqui estoy');
    refreshList.forEach(element => {
      dataArray.push(this.dbHandler.getSomething(element.endpoint));
    });
    forkJoin(dataArray).subscribe(info => {
      let i = 0;
      refreshList.forEach(element => {
        this.dbHandler.refreshData(info[i], element.name);
        i++;
      });
      window.location.reload();
    });
  }

  logout() {
    this.auth.logout();
    //this.router.navigateByUrl('/login');
    window.location.reload();
  }
}
