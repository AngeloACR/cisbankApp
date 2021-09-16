import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validateField(values){
  	var flag = true;

  	for(let value of values){
	  	if(value == undefined){
	  		flag = false;
	  		break;
	  	} else{
	  		continue;
	  	}
  	}

  	return flag;
  }
  
  validateMatch(password, rePassword){
    if(password == rePassword){
      return true;    
    } else{
      return false;
    }
  }

  validatePassLength(password){
    if(password.length >= 6 && password.length <=12){
      return true;
    } else{
      return false;
    }
  }

  validateLength(word, length){
	if(word.length != length){
      return false;
    } else{
      return true;
    }

  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);  	
  }



}
