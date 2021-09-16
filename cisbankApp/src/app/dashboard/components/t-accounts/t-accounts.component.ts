import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { FileValidator } from '../../../directives/fileValidator';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-t-accounts',
  templateUrl: './t-accounts.component.html',
  styleUrls: ['./t-accounts.component.css']
})
export class TAccountsComponent implements OnInit {

  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  name: string;
  taccsFields: string[];
  taccsValues: string[];
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  showPass: {};
  boxOn: boolean;
  menu: any;
  menuOn: number;
  isListar: boolean;
  isCrear: boolean;
  openBox: {};

  registroTacc: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private dbHandler: DbHandlerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'taccs') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }


  ngOnInit() {
  }

}
