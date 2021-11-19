import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { AuditPrintService } from '../services/audit-print.service';
import { DevsobcontrolService } from '../services/devsobcontrol.service';
import { LoginService } from '../services/login.service';
export interface DialogData {
  password: string;
}
@Component({
  selector: 'app-recusados',
  templateUrl: './recusados.component.html',
  styleUrls: ['./recusados.component.css']
})
export class RecusadosComponent implements OnInit {
  motives = new FormControl("", Validators.required);
  cant = new FormControl("", Validators.required);
  motivesitems = ["Robado","Perdido","Dañado"];
  panelOpenState = true;
  public data_head: any;
  public _codec_in: string = '';
  public _product: boolean = false;

  constructor( private loginservice:LoginService, private dns: DevsobcontrolService, private lote: AuditPrintService, public dialog: MatDialog) { }
  copaneelde = document.getElementById("paneel");
  ngOnInit(): void {
    this.ghead();  
  }
  search(){  
    var code = <HTMLInputElement> document.getElementById("input-code");
    if(code.value.length == 18){
      const x = code.value.trim().slice(0,15);
      const sliceXa = x.slice(0,5);
      const sliceXb = x.slice(6,9);
      localStorage.setItem('sliceCodeA', sliceXa);
      this.lote.getLoteUnit(sliceXa, sliceXb).subscribe( m => {
        console.log(m)
        this.arrLotes = m;
        this._product = true;
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
  verified(){
    if(this.panelOpenState){
      const dialogRef = this.dialog.open(recusadosFragment, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
        var webusu = sessionStorage.getItem('User_Name');
        if(result && webusu){
          let arrLog: any = {      
            WebUsu:  webusu,
            WebPass: result
          }
          this.loginservice.login(arrLog).subscribe(x =>{
            this.panelOpenState = false;
            Swal.fire({
              icon: 'success',
              title: 'Oops...',
              text: 'Aceso autorizado.',
            })
          }, ()=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Contraseña invalida.',
            })
          })
        }
      });
    }
  }
  savedata(){
    if(this.cant.valid && this.motives.valid){
      console.log(this.cant.value)
      console.log(this.motives.value)
    }
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
@Component({
  selector: 'recusados-fragment',
  templateUrl: 'recusados-fragment.html',
})
export class recusadosFragment {
  constructor(
    public dialogRef: MatDialogRef<recusadosFragment>
  ) {}
  password = new FormControl("", Validators.required);
  onNoClick(): void {
    this.dialogRef.close();
  }
  yesClick(){
    if(this.password.valid){
      this.dialogRef.close(this.password.value);
    }
  }
}
