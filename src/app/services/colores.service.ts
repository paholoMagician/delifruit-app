import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ColoresService {
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;


  constructor(private http: HttpClient, public router: Router) { }
  

  confalpMaster(model: any []) {
    return this.http.post( this.apiURL + '/control_alp_master_tabla/save_color_alp_master' ,  model);
  }

  conf_code_color(model: any []) {
    return this.http.post( this.apiURL + '/control_alp_master_tabla/save_color_code_lab' ,  model);
  }
  
  gecolor( codecmaster: string ) {
    return this.http.get( this.apiURL + '/control_alp_master_tabla/gecolor/' + codecmaster);
  }
  
  decolor( codecmaster: string, np: string ) {
    return this.http.get( this.apiURL + '/control_alp_master_tabla/delcolor/' + codecmaster + '/' + np);
  }
  removeallcolor(  name_module: string, token:string,  codex_color: string, option:number ) {
    return this.http.get( this.apiURL + '/dp08acal/DelEXEC/'+codex_color+'/'+option+'/'+token+'/'+name_module);
  }

}
