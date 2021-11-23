import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ControlModuleService {

 
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }


  getModulesGeneral() {
    return this.http.get( this.apiURL + '/modcon/get_module' )
  }

}
