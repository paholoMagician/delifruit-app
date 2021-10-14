import { Component, OnInit } from '@angular/core';
import { ConfcolorsService } from '../services/confcolors.service';

@Component({
  selector: 'app-confcolores',
  templateUrl: './confcolores.component.html',
  styleUrls: ['./confcolores.component.css']
})
export class ConfcoloresComponent implements OnInit {


  public _valor: string = '';
  public _color: string = '';

  constructor(public smas: ConfcolorsService) { }

  ngOnInit(): void {
  }

  public arrmaster: any = [];
  public count: number = 0;
  secuenciador() {

    let xx: string = '00';
    let z: any = localStorage.getItem('count-secuence') 

    if( localStorage.getItem('count-secuence') == undefined || localStorage.getItem('count-secuence') == '' ){
      this.count ++;
      localStorage.setItem('count-secuence', '00'+this.count.toString());      
    }
    else if( Number(localStorage.getItem('count-secuence')) >= 1 ) {
      // if( z.length <= 1 ) {
      //   localStorage.setItem('count-secuence', '00'+this.count.toString());
      // }
      this.count = Number( localStorage.getItem('count-secuence') );
      this.count ++;
      localStorage.setItem('count-secuence', '00'+this.count.toString());
      if(Number(localStorage.getItem('count-secuence')) > 9  && Number(localStorage.getItem('count-secuence')) <= 99 ){
        localStorage.setItem('count-secuence', '0'+this.count.toString());
      } else {
        // console.log('Es mayor a 99')
        localStorage.setItem('count-secuence', this.count.toString());
      }
    }
  }

  salpmaster(color: string, value: string) {

    // let xx: any = localStorage.getItem('count-secuence');
    // let y: string= '00';
    // if(xx.length < 2) {
    //   console.log('length es menor a 1')
    //   y = '00' + xx
    //   console.log( y );
    // }

    // else if ( xx.length == 2) {
    //   y = '0' + xx
    //   console.log( y );
    // }

    // else {
    //   y; 
    // }

    this.arrmaster = {
      master : "conf_color",
      codigo : `${localStorage.getItem('count-secuence')}`,
      nombre : value,
      valor  : "",
      nomtag : "",
      gestion: "",
      pideval: "",
      campo1 : color,
      grupo  : "",
      sgrupo : "",
      campo2 : "",
      lencod : ""
    }

    console.log( this.arrmaster );

    this.smas.confalpMaster(this.arrmaster).subscribe( x => {
      console.log(x);
    })

  }


}
