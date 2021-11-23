import { Component, OnInit } from '@angular/core';
import { DevolucionService } from 'src/app/services/devolucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})
export class DevolucionComponent implements OnInit {
  public show = false;
  public _codec_in: string = '';
  public historial = [""];
  public arrLotes : any = [];
  public arrDevs: any = [];
  public _obser: string = '';
  public _dev_cant: number = 1;
  public resultsearch = true;
  public resultsearch1 = true;
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private dns: DevolucionService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true
    }, 60);
  }
  getDevos() {
    const x = sessionStorage.getItem("Code_user");
    const y = localStorage.getItem('sliceCodeA');
    this.dns.getSobDevs( `${x}`,`${y}` ).subscribe( x => {
      this.arrDevs = x;
      if(this.arrDevs.length >= 1){
        this.resultsearch1  = false
      }else{
        this.resultsearch1  = true
      }
    })
  }
  public ArrDevos: any = [];
  sDevsobs( loteProd: string, finit: any, observ: string, cantidad: number, cantidadDev: number ) {
    if(observ.length >= 2){
    this.ArrDevos = {
      lote_prod:  loteProd,
      finit:      finit,
      ffin:       new Date(), 
      observ_dev: observ, 
      cant:       cantidad, 
      cant_dev:   cantidadDev, 
      total:      cantidad - cantidadDev, 
      campo:      '----',
      campoA:     sessionStorage.getItem("Code_user"),
      campoB:     sessionStorage.getItem("User_Name")
    }
    this.dns.saveSobDevs(this.ArrDevos).subscribe( y => {
      this.toast.fire({
        icon: 'success',
        title: 'Agregado con exito'
      })
      this._dev_cant = 1;
      this._obser = ""
      this.getDevos();
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Lote escaneado para devolución está repetido.',
        footer: 'Si desea hacer un cambio, pruebe actualizando.'
      })
    })
    }else{
      this.toast.fire({
        icon: 'error',
        title: 'Ingrese un motivo valido'
      })
  }
}
getLotes() {
  const localhistorial = localStorage.getItem('historial');
  var code = <HTMLInputElement> document.getElementById("input-code");
  if(code.value.length == 18){
    const x = code.value.trim().slice(0,15);
  const sliceXa = x.slice(0,5);
  const sliceXb = x.slice(6,9);
  const objethist = localhistorial?.split(",");
  const result = objethist?.includes(sliceXa+ "_" +sliceXb);
  if(!objethist){
    this.historial!.push(sliceXa+ "_" +sliceXb);
    localStorage.setItem('historial', `${this.historial}`);
  }
  if(!result){
    localStorage.setItem('sliceCodeA', sliceXa);
    this.dns.getLoteUnit(sliceXa, sliceXb).subscribe( m => {
      if(objethist && result){
        console.log("else")
        console.log(objethist)
        objethist!.push(sliceXa+ "_" +sliceXb);
        localStorage.setItem('historial', `${objethist}`);
      }
      this.arrLotes = m;
      this.getDevos();
      if(this.arrLotes.length == 0){
        this.resultsearch  = true
      }else{
        this.resultsearch  = false
      }
    }, (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Código no encontrado',
        footer: 'Vuelve a intentarlo'
      })
      this._codec_in = ''
    })
    code.value = ""
  }else{
    code.value = ""
    this.arrLotes = [];
    this.arrDevs = [];
    this.toast.fire({
      icon: 'error',
      title: 'No esta disponible'
    })
  }

  }
}
updatePK(lotePK: string, finit: any, observ: string, cantidad: number, id:string) {

  const xx = <HTMLInputElement> document.getElementById(`id-${id}`);
  console.log(xx.value)
  this.ArrDevos = {
    lote_prod:  lotePK,
    finit:      finit,
    ffin:       new Date(), 
    observ_dev: observ, 
    cant:       cantidad, 
    cant_dev:   Number(xx.value), 
    total:      cantidad - Number(xx.value), 
    campo:      '----',
    campoA:     sessionStorage.getItem("Code_user"),
    campoB:     sessionStorage.getItem("User_Name")
  }
  console.log(this.ArrDevos);
  console.log(lotePK)
  this.dns.putSobDevs(lotePK, this.ArrDevos).subscribe( upd => {
    console.log(upd);
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
}

