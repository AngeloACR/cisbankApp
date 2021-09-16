import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DbHandlerService {
  today = new Date();
  localSource = "http://localhost:3400";
  serverSource = "";

  mySource = this.localSource;
  //mySource = this.serverSource

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private auth: AuthService
  ) {}

  createSomething(body, endpoint) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    let token = this.auth.getToken();
    if (token != null) {
      headers = headers.append("Authorization", token);
    }
    var address = this.mySource;

    address = address + endpoint;
    console.log(address);
    return new Promise((resolve, reject) => {
      this.http.post(address, body, { headers: headers }).subscribe((data) => {
        // data is already a JSON object
		console.log("And here");
		resolve(data)
      });
    });
  }

  getSomething(endpoint) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    let token = this.auth.getToken();
    headers = headers.append("Authorization", token);
    var address = this.mySource;

    address = address + endpoint;

    return this.http.get(address, { headers: headers });
  }

  updateSomething(body, endpoint) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    let token = this.auth.getToken();
    headers = headers.append("Authorization", token);

    var address = this.mySource;

    address = address + endpoint;

    return this.http.put(address, body, { headers: headers });
  }

  deleteSomething(item, endpoint) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    let token = this.auth.getToken();
    headers = headers.append("Authorization", token);

    var address = this.mySource;

    address = address + endpoint;

    let params = new HttpParams();
    params = params.append("item", item);

    let options = {
      headers: headers,
      params: params,
    };

    return this.http.delete(address, options);
  }

  setLocal(name, value) {
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(value));
  }

  getLocal(name) {
    var value = JSON.parse(localStorage.getItem(name));
    return value;
  }

  /* 	storeAccCsv(csvText) {
				var accKeys = [];
			var accs = [];     
			let headers = new HttpHeaders();
			headers.append('Content-Type','application/json');
	  
			let options = {
				complete: (results, file) => {
					
					for(let i in results.data[0]){
						accKeys.push(results.data[0][i]);
					} 
	
					for(let i = 1; i < results.data.length; i++){
						if(results.data[i][0] == null || results.data[i][0] == ""){
							continue;
						}
							var auxAcc = {};
						for(let j = 0; j < accKeys.length; j++){
							auxAcc[accKeys[j]] = results.data[i][j];
						}
						accs.push(auxAcc);
					}
	
					var body = {
						accs: accs,
					};
	
					return this.http.post(this.mySource+this.addressTAccs+'/csvTAccs', body, {headers: headers});
					//this.storeAccs(accs);		                
				}
			};
	
			this.papa.parse(csvText,options);
		  	
		}
	
		storeMoveCsv(csvText) {
				var moveKeys = [];	
			var moves = [];
			let headers = new HttpHeaders();
			headers.append('Content-Type','application/json');
				    
			let options = {
				complete: (results, file) => {
					
					for(let i in results.data[0]){
						moveKeys.push(results.data[0][i]);
					} 
	
					for(let i = 1; i < results.data.length; i++){
						if(results.data[i][0] == null || results.data[i][0] == ""){
							continue;
						}
						var auxMove = {};
						for(let j = 0; j < moveKeys.length; j++){
							auxMove[moveKeys[j]] = results.data[i][j];
						}
						moves.push(auxMove);
	
					}
					var body = {
						moves: moves,
					};
	
					return this.http.post(this.mySource+this.addressMoves+'/csvMoves', body, {headers: headers});
	//				this.storeMoves(moves);
				}
			};
	
	
			this.papa.parse(csvText,options);
		  	
		  	
		} */
  /* 
		refreshData(endpoint, name) {
			return this.getSomething(endpoint)
				.subscribe(info => {   // data is already a JSON object
					if (info['status']) {
						let fields = [];
						let values = [];
						let dataFields = Object.keys(info['values'][0]);
						var j = 0;
						dataFields.forEach(field => {
							if (field !== 'id') {
								field = field[0].toUpperCase() + field.slice(1);
								fields.push(field);
							}
							j++;
						});
						info['values'].forEach(value => {
							let valueArray = Object.values(value);
							let vAux: any = {};
							var i = 0;
							dataFields.forEach(field => {
								if (field !== 'id') {
									vAux[i] = valueArray[i];
								}
								i++;
							});
							values.push(vAux);
						});
						localStorage.removeItem(name + 'Values');
						localStorage.removeItem(name + 'Fields');
						this.setLocal(name + 'Values', values);
						this.setLocal(name + 'Fields', fields);
					} else {
						localStorage.removeItem(name + 'Values');
						localStorage.removeItem(name + 'Fields');
					}
				});
		}
	
	
	 */

  refreshData(info, name) {
    console.log(info);
    let fields = [];
    let values = [];
    /* let dataFields = Object.keys(info['values'][0]);
		var j = 0;
		dataFields.forEach(field => {
			if (field !== 'id') {
				field = field[0].toUpperCase() + field.slice(1);
				fields.push(field);
			}
			j++;
		}); */
    info["fields"].forEach((field) => {
      if (field !== "id") {
        field = field[0].toUpperCase() + field.slice(1);
        fields.push(field);
      }
    });
    info["values"].forEach((value) => {
      let valueArray = Object.values(value);
      let vAux: any = {};
      var i = 0;
      fields.forEach((field) => {
        if (field !== "id") {
          vAux[i] = valueArray[i];
        }
        i++;
      });
      values.push(vAux);
    });
    this.setLocal(name + "Values", values);
    this.setLocal(name + "Fields", fields);
    window.location.reload();
  }
}
