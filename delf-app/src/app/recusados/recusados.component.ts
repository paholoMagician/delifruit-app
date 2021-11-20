import { Component, OnInit } from '@angular/core';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { AuditPrintService } from '../services/audit-print.service';
import { ControlMotivService } from '../services/control-motiv.service';
import { DevsobcontrolService } from '../services/devsobcontrol.service';

@Component({
  selector: 'app-recusados',
  templateUrl: './recusados.component.html',
  styleUrls: ['./recusados.component.css']
})
export class RecusadosComponent implements OnInit {

  public data_head: any;
  public _codec_in: string = '';
  public _product: boolean = false;

  public loading = false;
  public loadinglist = true;
  public listdata:any = [];
  public titlemotiv = "";
  public descriptmotiv = "";
  public _total: number = 0;

  public _cant_recu: number = 0;

  constructor( private dns: DevsobcontrolService, private lote: AuditPrintService, private servicemotiv: ControlMotivService) { }

  ngOnInit(): void {
    this.ghead();  
    this.loadfun();
  }

  ghead() {
    this.data_head = localStorage.getItem('name_module');
  }
  
  public toast = Swal.mixin({    
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  loadfun(){
    this.loadinglist = true;
    var tok = sessionStorage.getItem("Code_user");
    var order = "asc"
    this.servicemotiv.loaddata(`${tok}`, order).subscribe( x => {
      this.listdata = x;
      // this.loadinglist = false;

      console.log(this.listdata);

    }, (errr)=>{
      this.toast.fire({
        icon: 'error',
        title: 'Error al cargar la lista'
      })
      this.loadinglist = false;
    })
  }

  calc(a:number, b: number) {
    this._total =   b - a;
    console.log(this._total);
    return this._total;
  }

  getDataSel( a: string, b: string ) {
    localStorage.setItem('nom_motiv', a);
    localStorage.setItem('des_motiv', b);
  }

  public arrLotes : any = [];
  getLotes(codecs: string) {

    const x = codecs.trim().slice(0,15);

    const sliceXa = x.slice(0,5);
    const sliceXb = x.slice(6,9);

    console.log(x);
    console.log(sliceXa);
    console.log(sliceXb);

    // localStorage.setItem('CodLOTE:', sliceXb);
    localStorage.setItem('sliceCodeA', sliceXa);

    this.lote.getLoteUnit(sliceXa, sliceXb).subscribe( m => {
      this.arrLotes = m;
      console.log(this.arrLotes)
      this._product = true;
      console.log(this._product);
    }, () => {
      this._product = false;
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
