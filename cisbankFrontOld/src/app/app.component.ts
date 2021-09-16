import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './services/data-handler.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cisbankFront';

  constructor(
    private data: DataHandlerService
  	) { }

  ngOnInit() {
        this.data.updateMs();
        this.data.updateBs();
        this.data.updateTs();
        this.data.updateMTs();
  }

}
