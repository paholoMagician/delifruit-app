import { Component, OnInit } from '@angular/core';
import { AuditPrintService } from '../services/audit-print.service';
import { DevsobcontrolService } from '../services/devsobcontrol.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Dp08acalService } from '../services/dp08acal.service';
import { ConfcolorsService } from '../services/confcolors.service';
import { ALPTABLAService } from '../services/alptabla.service';
import { CosechacontrolService } from '../services/cosechacontrol.service';

@Component({
  selector: 'app-control-cosecha',
  templateUrl: './control-cosecha.component.html',
  styleUrls: ['./control-cosecha.component.css']
})
export class ControlCosechaComponent implements OnInit {

  constructor(private ccosecha: CosechacontrolService, private dns: DevsobcontrolService, public chcien: ALPTABLAService, private lote: AuditPrintService, private gdp: Dp08acalService, public smas: ConfcolorsService) { }

  public _codec_in: string = '';
  public data_head: any;
  public _color_sel: string = '';
  public _cantidad: number = 0;

  public _value_cortes: number = 0;
  public _hacienda: string = '';

  ngOnInit(): void {
    this.gDP08ACAL('asc');
    this.gHaciendas('HCIE_GR', 'sgrupo');
    this.ggcosecha(50, 'desc');
  }


  ghead() {
    this.data_head = localStorage.getItem('name_module');
  }

  formatLabel(value: number) {
    if (value >= 6) {
      return Math.round(value / 6) + 'max.';
    }

    return value;
  }

  public arrLotes : any = [];
  public cantidadLote: number = 0;
  getLotes(codecs: string) {

    const x = codecs.trim().slice(0,15);
    const sliceXa = x.slice(0,5);
    const sliceXb = x.slice(6,9);

    // console.log(x);
    // console.log(sliceXa);
    // console.log(sliceXb);

    // localStorage.setItem('CodLOTE:', sliceXb);
    localStorage.setItem('sliceCodeA', sliceXa);


    this.lote.getLoteUnit(sliceXa, sliceXb).subscribe( m => {

      this.arrLotes = m;
      console.log(this.arrLotes);

      this.cantidadLote = this.arrLotes[0].totalStock;
      console.log(this.cantidadLote);
      localStorage.setItem('_cant_cosecha', this._cantidad.toString());

      if( this._cantidad >= this.cantidadLote) {

        Swal.fire({
          icon: 'warning',
          title: 'Límite alcanzado'
        })

        this._cantidad = this.cantidadLote;
        localStorage.setItem('_cant_cosecha', this.cantidadLote.toString());

      }

      else {

        this._cantidad ++;
        localStorage.setItem('_cant_cosecha', this._cantidad.toString());
        this.cantidadLote = this.arrLotes[0].totalStock;
        
      }
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto encontrado'
      })

    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Código no encontrado',
        footer: 'Vuelve a intentarlo'
      })
      this._codec_in = ''
    })

  }

  // jj.sema + '/' + jj.peri + '/' + jj.anio
  public _semana: string = '';
  asignData(color: string, semana: string) {
    this._color_sel = color;
    this._semana = semana;
    localStorage.setItem('_color', color);
    localStorage.setItem('_semana', this._semana);
  }

  //Obtiene Haciendas
  public ArrHaciendas: any = [];
  gHaciendas(nomtag: string, properties: string) {    
    this.chcien.getMaster(nomtag, properties).subscribe( HACIE => {
      this.ArrHaciendas = HACIE;
      console.log(this.ArrHaciendas);
    })
  }

  // Obtiene la semanas
  public arrDp08acal: any = [];
  gDP08ACAL(order: string) {
    this.gdp.getDp08acal(order).subscribe( db => {
      this.arrDp08acal = db;
      console.log(this.arrDp08acal);   
    })
  }

  public naHacienda: string = '';
  getHacienda( nombre: string, codigo: string ) {
    
    this._hacienda  = codigo;
    this.naHacienda = nombre;

    

  }


  /**MANEJO DEL CRUD DE COSECHAS EN LA TABLA COPNTROL_COSECHA */
  //#region 

  public scosechArr: any = [];

  sscosecha( cortes: number, semana: string, color: string, hacienda: string, codHacienda: string ) {

    this.scosechArr = {
      code_user: sessionStorage.getItem('Code_user'),
      cortes: cortes,
      semana: semana,
      color: color,
      hacienda: hacienda,
      f_cosecha: new Date(),
      cod_hacienda:  codHacienda

    }

    console.log(this.scosechArr);

    this.ccosecha.scosecha(this.scosechArr).subscribe(x=> {       
      //this.scosechArr = x;
      console.log('GUARDADO COSECHA')
      console.log(x)
      this.ggcosecha(50, 'desc');
    })


  }

  public arrCosecha: any = [];
  ggcosecha(top: number, order: string) {
    this.ccosecha.gcosecha( top, order ).subscribe( m => {
      this.arrCosecha = m;
      console.log(this.arrCosecha);
    })
  }

  ddcosecha(id: number) {
    
    Swal.fire({
      title: '¿Está usted seguro?',
      text: "esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.ccosecha.dcsecha( id ).subscribe( dd => {      
          console.log('BORRADO');
          this.ggcosecha(50, 'desc');      
        })
        Swal.fire(
          'Deleted!',
          'Tu cosecha ha sido borrada!',
          'success'
        )
      }
    })

  }

  //#endregion


}
