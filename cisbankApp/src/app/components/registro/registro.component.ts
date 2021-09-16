import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbHandlerService } from '../../dashboard/services/db-handler.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FileValidator } from '../../directives/fileValidator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  registroUser: FormGroup;
  registroEmpresa: FormGroup;

  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;
  isEmpresa: Boolean;
  isEmpleado: Boolean;
  showBlack: {};
  showForm: {};
  selectedImg: String;
  empresaImg: String;
  empleadoImg: String;

  constructor(
    private auth: AuthService,
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.empresaImg = 'assets/registro/iconoEmpresa.svg';
    this.empleadoImg = 'assets/registro/iconoEmpleado.svg';
  }

  initForm() {
    this.registroUser = new FormGroup({
      username: new FormControl(''),
      mail: new FormControl(''),
      name: new FormControl(''),
      tlf: new FormControl(''),
      password: new FormControl(''),
      cpassword: new FormControl(''),
    });

    this.registroEmpresa = new FormGroup({
    });


  }

  toggleForm(event, tipo) {
    this.formSelected = true;
    let img;
    switch (tipo) {
      case 'empresa':
        this.isEmpresa = true;
        this.isEmpleado = false;
        img = this.empresaImg;
        break;
      case 'empleado':
        this.isEmpresa = false;
        this.isEmpleado = true;
        img = this.empleadoImg;
        break;
      default:
        this.isEmpresa = false;
        this.isEmpleado = true;
        img = this.empleadoImg;
        break;
    }
    this.selectedImg = img;
    console.log(this.selectedImg);
    this.tipoSelected = tipo;
    this.showForm = {
      formAct: true
    }
    this.showBlack = {
      blackAct: true
    }

  }

  async endRegistro() {
    var userAux = this.registroUser.value;
    var userValues;
    let tipo = this.tipoSelected;

    switch (tipo) {
      case 'empresa':
        var formAux = this.registroEmpresa.value;
        userValues = {
          username: userAux.username,
          name: userAux.name,
          tlf: userAux.tlf,
          mail: userAux.mail,
          password: userAux.password,
          type: 'Empresa',
        };

        break;
      case 'empleado':
        userValues = {
          username: userAux.username,
          name: userAux.name,
          tlf: userAux.tlf,
          mail: userAux.mail,
          password: userAux.password,
          type: 'empleado',
        };

        break;
      default:
        userValues = {
          username: userAux.username,
          name: userAux.name,
          tlf: userAux.tlf,
          mail: userAux.mail,
          password: userAux.password,
          type: 'empleado',
        };

        break;
      }
      let endpoint = '/users/';
    await this.dbHandler.createSomething(userValues, endpoint)

      this.router.navigateByUrl('/login');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  flush() {

  }

  registerUser() {

  }
  registerDoctor() {

  }

  closeForm() {
    this.showForm = {
      formAct: false
    }
    this.showBlack = {
      blackAct: false
    }

  }


}
