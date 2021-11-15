import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CosechacontrolService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }

  scosecha( model: any [] ) {
    return this.http.post( this.apiURL + '/cosecha/saveCosecha', model )
  }

  gcosecha(top: number, order: string) {
    return this.http.get( this.apiURL + '/cosecha/getCosecha/' + top + '/' + order );
  }

  pcsecha(model: any [], id: number) {
    return this.http.put( this.apiURL + '/cosecha/putCosecha/' + id, model);
  }

  dcsecha(id: number) {
    return this.http.get( this.apiURL + '/cosecha/delCosecha/' + id);
  }

}
