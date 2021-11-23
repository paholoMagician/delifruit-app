import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CosechaService } from 'src/app/services/cosecha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cosechas',
  templateUrl: './cosechas.component.html',
  styleUrls: ['./cosechas.component.css']
})
export class CosechasComponent implements OnInit {
  loadingadd = false
  Semana = new FormControl('', Validators.required);
  Hacienda = new FormControl('', Validators.required);
  scosechArr:any = [];
  cosecha:any = [];
  haciendas:any = [];
  weeks:any = [];
  public _color_sel: string = '';
  public _semana: string = '';
  public naHacienda: string = '';
  public _hacienda: string = '';

  constructor(private service:CosechaService) { }

  ngOnInit(): void {
    this.loadweeks('asc');
    this.loadcosechas(50, 'desc')
    this.loadhaciendas('HCIE_GR', 'sgrupo');
  }
  loadweeks(order: string) {
    this.loadingadd = true   
    this.service.getDp08acal(order).subscribe( db => {
      this.loadingadd = false   
      this.weeks = db;
    }, () => {
      this.loadingadd = false   
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al cargar las cosechas.',
      })
    })
  }
  loadcosechas(max:number, order:string){
    this.service.gcosecha(max, order).subscribe(x =>{
      this.cosecha = x
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al cargar las cosechas.',
      })
    })
  }
  loadhaciendas(nomtag: string, properties: string) {
    this.loadingadd = true    
    this.service.getMaster(nomtag, properties).subscribe( HACIE => {
      this.loadingadd = false;
      this.haciendas = HACIE
    }, () => {
      this.loadingadd = false  ;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al cargar las haciendas.',
      })
    })
  }
  delete(id:number){
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
        this.service.dcsecha( id ).subscribe( dd => {      
          this.loadcosechas(50, 'desc')
          Swal.fire({
            icon: 'success',
            title: 'Exito...',
            text: 'Borrada con exito.',
          })
        })
      }
    })
  }
  adddata(){
    if(this.Semana.valid && this.Hacienda.valid){
        this.scosechArr = {
          code_user: sessionStorage.getItem("Code_user"),
          cortes: 0,
          semana: this._semana,
          color: this._color_sel,
          hacienda: this.naHacienda,
          f_cosecha: new Date(),
          cod_hacienda:  this._hacienda,
    
        }
        console.log(this.scosechArr);
        this.service.scosecha(this.scosechArr).subscribe (x => {       
          console.log('GUARDADO COSECHA')
          console.log(x)
          this.loadcosechas(50, 'desc');
          Swal.fire({
            icon: 'success',
            title: 'Exito...',
            text: 'Guardado con exito.',
          })
        }, (e) => {
          this.loadingadd = false  ;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al guardar.',
          })
        })
    }
  }
  asignData(color: string, semana: string) {
    this._color_sel = color;
    this._semana = semana;
    localStorage.setItem('_color', color);
    localStorage.setItem('_semana', this._semana);
  }
  getHacienda( nombre: string, codigo: string ) {
    this._hacienda  = codigo;
    this.naHacienda = nombre;
  }
}
