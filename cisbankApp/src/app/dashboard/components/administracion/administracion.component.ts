import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd,
} from "@angular/router";
import { DbHandlerService } from "../../services/db-handler.service";
import { FormBuilder, FormGroup, FormControl, FormArray } from "@angular/forms";
import { flatMap } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-administracion",
  templateUrl: "./administracion.component.html",
  styleUrls: ["./administracion.component.css"],
})
export class AdministracionComponent implements OnInit {
  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  forms: string[];
  usersFields: string[];
  usersValues: string[];
  addText: string;
  myForm: FormGroup;
  registroUser: FormGroup;
  registroRol: FormGroup;
  permisosFields: string[];
  permisosValues: string[];
  rolesFields: string[];
  rolesValues: string[];

  boxOn: boolean;
  menu: any;
  menuOn: number;

  isListarUsuarios: boolean;
  isCrearUsuarios: boolean;
  isCrearRoles: boolean;
  isListarRoles: boolean;
  isAsignarPermisos: boolean;

  openBox: {};

  constructor(
    private actRoute: ActivatedRoute,
    private dbHandler: DbHandlerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actRoute.params.subscribe((params) => {
      this.id = params["id"];
    });
    this.router.events.subscribe((event) => {
      this.actRoute.url.subscribe((value) => {
        let url = value[0].path;
        if (url == "adm") {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }
      });
    });
  }

  ngOnInit() {
    this.isCrearUsuarios = false;
    this.isListarUsuarios = false;
    this.isCrearRoles = false;
    this.isListarRoles = false;
    this.isAsignarPermisos = false;

    /*this.setMenu();
    this.isUsers = false;
    this.isEmpresas = false;
    this.isServicios = false;
    this.isPermisos = false;
    this.empresasValues = this.dbHandler.getLocal('empresasValues');
    this.empresasFields = this.dbHandler.getLocal('empresasFields');
    this.serviciosValues = this.dbHandler.getLocal('serviciosValues');
    this.serviciosFields = this.dbHandler.getLocal('serviciosFields');
    */
    this.permisosValues = this.dbHandler.getLocal("permisosValues");
    this.permisosFields = this.dbHandler.getLocal("permisosFields");
    this.usersValues = this.dbHandler.getLocal("usersValues");
    this.usersFields = this.dbHandler.getLocal("usersFields");
    if (this.id == "0") {
      this.isCrearUsuarios = true;
      //      this.isEmpresas = false;

      this.initComponent(
        "/users/",
        "users",
        "Crear Usuario",
        this.usersValues,
        this.usersFields
      );
    } else if (this.id == "1") {
      //      this.isUsers = false;
      this.isListarUsuarios = true;
      this.initComponent(
        "/users/all",
        "users",
        "Lista de Usuarios",
        this.usersValues,
        this.usersFields
      );
    } else if (this.id == "2") {
      this.initComponent(
        "/auth/",
        "roles",
        "Crear Rol",
        this.rolesValues,
        this.rolesFields
      );
      this.isCrearRoles = true;
    } else if (this.id == "3") {
      this.isListarRoles = true;
      this.initComponent(
        "/auth/",
        "roles",
        "Lista de Roles",
        this.rolesValues,
        this.rolesFields
      );
    } else if (this.id == "4") {
      this.isListarRoles = true;
      this.initComponent(
        "/permisos/",
        "permisos",
        "Asignación de permisos",
        this.permisosValues,
        this.permisosFields
      );
    }

    this.initForm();
    /*this.showRow = {
      showRow: false
    };
    this.openBox = {
      openBox: false
    };
 */
  }

  /*   setMenu() {
      this.menu = [{
        name: 'Administrar usuarios',
        link: '/adm/0',
        class: {
          menuAct: false
        },
      },
      {
        name: 'Administrar empresas',
        link: '/adm/1',
        class: {
          menuAct: false
        },
      },
      {
        name: 'Administrar servicios',
        link: '/adm/2',
        class: {
          menuAct: false
        },
      },
      {
        name: 'Administrar permisos',
        link: '/adm/3',
        class: {
          menuAct: false
        },
      }];
      this.menuOn = +this.id;
      this.menu[this.menuOn].class = {
        menuAct: true
      };
    } */

  initForm() {
    this.registroUser = new FormGroup({
      nombre: new FormControl(""),
      apellido: new FormControl(""),
      username: new FormControl(""),
      mail: new FormControl(""),
      rol: new FormControl(""),
      password: new FormControl(""),
      cpassword: new FormControl(""),
    });

    this.registroRol = new FormGroup({
      rol: new FormControl(""),
    });
  }

  initComponent(endpoint, name, title, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
    this.values = values;
    this.fields = fields;
  }
  printId(id: string) {
    return id;
  }

  deleteItem(event, item) {
    var myEnd = this.endpoint;
    if (myEnd.includes("/all")) {
      myEnd = myEnd.replace("/all", "/");
    }
    let functions = [];
    /*     this.dbHandler.deleteSomething(item[0], myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          }); */
    this.dbHandler
      .deleteSomething(item, myEnd)
      .pipe(flatMap((res1) => this.dbHandler.getSomething(this.endpoint)))
      .subscribe((info) => {
        this.dbHandler.refreshData(info, this.name);
        window.location.reload();
      });
  }

  async createUser() {
    var myEnd = this.endpoint;
    let body = {};
    let values = this.registroUser.value;
    let i = 0;
    this.fields.forEach((field) => {
      let myField = field.toLowerCase();
      body[myField] = values[i];
      i++;
    });
    await this.dbHandler.createSomething(body, myEnd);
    this.dbHandler.refreshData(myEnd, this.name);
  }

  async createRol() {
    var myEnd = this.endpoint;
    let body = {};
    let values = this.registroRol.value;
    let i = 0;
    this.fields.forEach((field) => {
      let myField = field.toLowerCase();
      body[myField] = values[i];
      i++;
    });
    await this.dbHandler.createSomething(body, myEnd);
    this.dbHandler.refreshData(myEnd, this.name);
  }

  openForm() {
    this.forms.push("");
    //this.showForm = true;
    this.tBox();
  }

  tBox() {
    this.boxOn = !this.boxOn;
    this.openBox = {
      oBox: this.boxOn,
    };
  }
  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }
}
