import { Component, OnInit } from '@angular/core';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { AuditPrintService } from '../services/audit-print.service';
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

  constructor( private dns: DevsobcontrolService, private lote: AuditPrintService) { }

  ngOnInit(): void {
    this.ghead();  
  }

  ghead() {
    this.data_head = localStorage.getItem('name_module');
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
