import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { flatMap } from 'rxjs/operators';
import { FileValidator } from '../../../directives/fileValidator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  name: string;
  bancosFields: string[];
  bancosValues: string[];
  movesFields: string[];
  movesValues: string[];
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  showPass: {};
  boxOn: boolean;
  menu: any;
  menuOn: number;
  isDisponibilidad: boolean;
  isListar: boolean;
  isCrear: boolean;
  openBox: {};

  showB: boolean;
  showM: boolean;

  registroBanco: FormGroup;


  constructor(
    private actRoute: ActivatedRoute,
    private db: DbHandlerService,
    private router: Router,
    private fb: FormBuilder,
    private decimalPipe: DecimalPipe
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'bancos') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {

    this.bancosValues = this.db.getLocal('banksValues');
    this.bancosFields = this.db.getLocal('banksFields');
    if (this.bancosValues == null) {
      this.showB = false;
    } else {
      this.showB = true;
    }

    this.showM = false;

    switch (this.id) {
      case '0': {
        this.isDisponibilidad = true;
        this.isCrear = false;
        this.isListar = false;
        break;
      }
      case '1': {
        this.isListar = true;
        this.isDisponibilidad = false;
        this.isCrear = false;
        break;
      }
      default: {
        this.isCrear = true;
        this.isDisponibilidad = false;
        this.isListar = false;
        break;
      }
    }
  }

  selectMove(event, bank) {
    this.movesValues = this.db.getLocal('moves');
    if (this.movesValues == null) {
    } else {
      for (let move of this.movesValues) {
        //        move.mAmmount =  formatNumber(move.mAmmount,'es-VE');
        //        move.mOld =  formatNumber(move.mOld,'es-VE');
        //       move.mNew =  formatNumber(move.mNew,'es-VE');
        if (bank == this.movesValues['mBAcc']) {
          if (this.movesValues['mSign']) {
            this.movesValues['mNature'] = "+";
          } else {
            this.movesValues['mNature'] = "-";
          }
          this.movesValues['mDate'] = this.movesValues['mDate'].substring(0, 10);
        }
      }
      this.showM = true;
    }
  }

}
