import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { faQuestionCircle, faCalendarPlus, faComments, faIdCard, faUserCog, faAddressBook, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

	boxOn: boolean;
	menuOn: number;
	prevMenu: number;

	user: any;
	isAdmin: boolean;
	isEmpleado: boolean;

	myMenu: any;
	adminMenu: any;
	empleadoMenu: any;

	constructor(
		private auth: AuthService
	) {

	}

	ngOnInit() {

		this.user = this.auth.decode();
		this.isAdmin = (this.user.tipo === 'Admin');
		this.isEmpleado = (this.user.tipo === 'Empleado');
		if (this.isAdmin) {
			this.setAdminMenu();
		} else if (this.isEmpleado) {
			this.setEmpleadoMenu();
		}
	}

	setAdminMenu() {
		this.myMenu = [{
			name: 'Administrador',
			link: '/adm/0',
			id: 0,
			icon: faUserCog,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Usuarios',
				link: '/adm/0',
				id: 0
			},
			{
				name: 'Lista Usuarios',
				link: '/adm/1',
				id: 1
			},
			{
				name: 'Crear Roles',
				link: '/adm/2',
				id: 2
			},
			{
				name: 'Listar Roles',
				link: '/adm/3',
				id: 3
			},
			{
				name: 'Asignacion de permisos',
				link: '/adm/4',
				id: 4
			},
			],
		},
		{
			name: 'Banco',
			link: '/bancos/0',
			id: 1,
			icon: faAddressBook,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Disponibilidad bancaria',
				link: '/bancos/0',
				id: 0
			},
			{
				name: 'Directorio',
				link: '/bancos/1',
				id: 1
			},
			{
				name: 'Agregar banco',
				link: '/bancos/2',
				id: 2
			}
			],
		},
		{
			name: 'Mayor analítico',
			link: '/taccs/0',
			id: 2,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Resumen Cuentas T',
				link: '/taccs/0',
				id: 0
			},
			{
				name: 'Agregar Cuentas T',
				link: '/taccs/1',
				id: 1
			},
			{
				name: 'Movimientos Diarios',
				link: '/moves/0',
				id: 2
			},
			{
				name: 'Agregar movimiento',
				link: '/moves/1',
				id: 3
			}
			],
		},
		{
			name: 'Resultados',
			link: '/cashflow/0',
			id: 3,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Flujo de caja',
				link: '/cashflow/0',
				id: 0
			},
			{
				name: 'Estado de Resultados',
				link: '/cashflow/1',
				id: 1
			},
			{
				name: 'Proyecciones',
				link: '/cashflow/2',
				id: 2
			}],
		},
		{
			name: 'Estadisticas',
			link: '/estadisticas/0',
			id: 4,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [],
		}
		];
	}


	setEmpleadoMenu() {
		this.myMenu = [{
			name: 'Perfil',
			id: 0,
			icon: faIdCard
		}];
	}

	tMenu(event, item) {
		this.closeMenus();
		this.myMenu[item.id].class = {
			aBox: true,
		}
	}

	closeMenus() {
		this.myMenu.forEach(item => {
			item.class = {
				aBox: false,
			}
		});
	}

}
