import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  aBox0: {}; 
  aBox1: {}; 
  aBox2: {}; 
  aBox3: {}; 

  aMenu0: {}; 
  aMenu1: {}; 
  aMenu2: {}; 
  aMenu3: {}; 

  boxOn: boolean;
  menuOn: number;
  prevMenu: number;

  constructor() {

	}

  ngOnInit() {

  	this.prevMenu = -1;
    this.menuOn = -1;
    this.boxOn = false;
    this.boxZero();
  }

  tMenu(menu: any){

  	this.boxZero()
  	this.menuOn = menu; 

  	if(this.prevMenu != this.menuOn){

  		
		switch(menu) { 
		   case '0': {
				this.aMenu0 = {
					aMenu: true
				}; 
				this.aBox0 = {
			  		aBox: true
			  	};
		      break; 
		   }
		   case '1': { 
				this.aMenu1 = {
					aMenu: true
				}; 
				this.aBox1 = {
			  		aBox: true
			  	};
		      break; 
		   }
		   case '2': { 
				this.aMenu2 = {
					aMenu: true
				}; 
				this.aBox2 = {
			  		aBox: true
			  	};
		      break; 
		   }	
		   case '3': { 
				this.aMenu3 = {
					aMenu: true
				}; 
				this.aBox3 = {
			  		aBox: true
			  	};
		      break; 
		   }	
		} 
	  	this.boxOn = true;
  	} else {
	    this.menuOn = -1;
	    this.boxOn = false;
  	}

	this.prevMenu = this.menuOn;

  }

  boxZero(){
  	this.aBox0 = {
  		aBox: false
  	}; 
  	this.aBox1 = {
  		aBox: false
  	}; 
  	this.aBox2 = {
  		aBox: false
  	};  
  	this.aBox3 = {
  		aBox: false
  	};

  	this.aMenu0 = {
  		aMenu: false
  	}; 
  	this.aMenu1 = {
  		aMenu: false
  	}; 
  	this.aMenu2 = {
  		aMenu: false
  	};  
  	this.aMenu3 = {
  		aMenu: false
  	}; 

  }

}
