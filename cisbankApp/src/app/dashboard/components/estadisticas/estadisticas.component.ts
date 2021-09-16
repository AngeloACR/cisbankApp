import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { FileValidator } from '../../../directives/fileValidator';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  name: string;
  bancosFields: string[];
  bancosValues: string[];
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

  registroBanco: FormGroup;


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
        if (url == 'estadisticas') {
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
