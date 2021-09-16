import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = '/auth'

  today = new Date;

  localSource = 'http://localhost:3400';

  serverSource = '';

  prodSource = '';

  mySource = this.localSource;
  //mySource = this.serverSource;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  login(logData: any) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let body = {
      username: logData.username,
      password: logData.password
    }
    var address = this.mySource + this.endpoint + '/';
    return this.http.post(address, body, { headers: headers });

  }
  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.reload();
  }

  storeData(storeData: any) {
    localStorage.setItem('token', storeData.token);
    localStorage.setItem('loggedIn', storeData.auth);
  }

  resetPass(resetData: any) {

  }

  decode() {
    try {
      var token = localStorage.getItem('token');
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  isAuthenticated() {
    const loggedIn = localStorage.getItem('loggedIn');
    const isLogged = (loggedIn == 'true')
    return isLogged;
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

}
