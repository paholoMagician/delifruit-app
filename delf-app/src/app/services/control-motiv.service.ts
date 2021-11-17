import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ControlMotivService {
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient, public router: Router) { }
  savemotiv(model:any[]) {
    return this.http.post( this.apiURL + '/Motiv/save_motiv', model )
  }
  editmotiv(model:any[], id: number, tok: string) {
    return this.http.put( this.apiURL + '/Motiv/putMotiv/'+ id +'/'+ tok ,model)
  }
  deletemotiv(id: number, tok: string) {
    return this.http.get( this.apiURL + '/Motiv/DelMotiv/'+ id +'/'+ tok )
  }
  getmotiv(token: string, order: string) {
    return this.http.get( this.apiURL + '/Motiv/getMotiv/'+ token +'/'+ order )
  }
}
