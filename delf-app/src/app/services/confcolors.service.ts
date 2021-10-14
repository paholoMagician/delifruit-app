import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfcolorsService {
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  
  constructor(private http: HttpClient, public router: Router) { }
  

  confalpMaster(model: any []) {
    return this.http.post( this.apiURL + '/control_alp_master_tabla/save_color_alp_master' ,  model);
  }


}
