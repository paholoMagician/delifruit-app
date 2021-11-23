import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recusado',
  templateUrl: './recusado.component.html',
  styleUrls: ['./recusado.component.css']
})
export class RecusadoComponent implements OnInit {
  motives = new FormControl("", Validators.required);
  cant = new FormControl("", Validators.required);
  inputopt = new FormControl("", Validators.required);
  motivesitems = ["Robado","Perdido","Dañado"];
  showFiller = false;
  option = "Recusado"
  panelOpenState = true;
  titleoption = "";
  show = false;
  public data_head: any;
  public _codec_in: string = '';
  public _product: boolean = false;
  toast = Swal.mixin({
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
  constructor( private router:Router,private loginservice:LoginService, private dns: DevolucionService, private lote: AuditoriaService, public dialog: MatDialog) { }
  copaneelde = document.getElementById("paneel");
  ngOnInit(): void {
    //this.selectopyiopn()
    setTimeout(() => {
      this.show = true
    }, 60);
    this.ghead(); 
    this.loaddatas()
}
loaddatas(){
  var tipe = localStorage.getItem("optionsrec") || "";
  var token:any = sessionStorage.getItem("Code_user");
  this.lote.loaddata(token, tipe).subscribe( m => {
    console.log(m)
  }, ()=>{
    this.toast.fire({
      icon: 'error',
      title: 'Reintente mas tarde'
    })
  })
}
selectopyiopn(){
  const dialogseled = this.dialog.open(recusadosOptions, {
    width: 'auto',
    disableClose: true
  });
  dialogseled.afterClosed().subscribe(resultopt => {
    if(resultopt){
      Swal.fire({
        title: 'Esta seguro que desea continuar con esta opcion',
        showDenyButton: true,
        confirmButtonText: 'Continuar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          if(resultopt == 1){
            this.option = "Caido"
          }
          this.titleoption = this.option;
          this.option = this.option.toUpperCase();
          this.option = this.option.slice(0, 3)
          localStorage.setItem("optionsrec", this.option)
        } else if (result.isDenied) {
          this.selectopyiopn()
        }
      }) 
    }
})
}
public checkdev:any = [];
  search(){  
    var code = <HTMLInputElement> document.getElementById("input-code");
    if(code.value.length == 18){
      const x = code.value.trim().slice(0,15);
      const sliceXa = x.slice(0,5);
      const sliceXb = x.slice(6,9);
      localStorage.setItem('sliceCodeA', sliceXa);
      this.lote.getLoteUnit(sliceXa, sliceXb).subscribe( m => {
        this.checkdev = m;
        console.log(this.checkdev)
        var verifie = this.checkdev[0]?.cant_dev
        if(verifie == 0){
          Swal.fire({
            title: 'No tiene devoluciones, porfavor ingrese devoluciones primero.',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/rule']);
            }
          })
        }else{
          this.arrLotes = m;
         this._product = true;
        }
      }, () => {
        this._product = false;
        this.toast.fire({
          icon: 'error',
          title: 'Codigo no encontrado'
        })
        this._codec_in = ''
      })
    }else{
      this.toast.fire({
        icon: 'error',
        title: 'Ingresa un codigo valido'
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
            this.toast.fire({
              icon: 'success',
              title: 'Verificacion exitosa'
            })
          }, ()=>{
            this.toast.fire({
              icon: 'error',
              title: 'Aceso no autorizado'
            })
          })
        }
      });
    }
  }
  savedata(){
    if(this.cant.valid && this.motives.valid){
      var secuencial = localStorage.getItem("secuencial");
      let secuencialfi = secuencial?.padStart(4,'0');
      var numbersecuencial = 0
      if(secuencial == "null"){
        numbersecuencial++;
      }else{
        numbersecuencial = Number(secuencial); 
        numbersecuencial++;
      }
      localStorage.setItem("secuencial", `${numbersecuencial}`);
      var token:any = sessionStorage.getItem("Code_user");
      var codex = token + "_" + secuencialfi;
      var today = new Date()
      var year = today.getFullYear();
      var model = {
        observer_recu: "",
        num_recu: this.cant.value,
        date: today, 
        motive: "null",
        token_user: token, 
        tipo: this.option,
        codec_recu: codex
    }
    console.log(model)
    this.lote.savedata(model).subscribe( m => {
      console.log(m)
    }, ()=>{
      this.toast.fire({
        icon: 'error',
        title: 'Reintente mas tarde'
      })
    })
    }
  }
  editdata(id:number){

  } 
  ghead() {
    this.data_head = localStorage.getItem('name_module');
  }
  editcam(){
    var secuencial = localStorage.getItem("secuencial");
    let secuencialfi = secuencial?.padStart(4,'0');
    var numbersecuencial = 0
    if(secuencial == "null"){
      numbersecuencial++;
    }else{
      numbersecuencial = Number(secuencial); 
      numbersecuencial++;
    }
    localStorage.setItem("secuencial", `${numbersecuencial}`);
    var token = sessionStorage.getItem("Code_user");
    var codex = token + "_" + secuencialfi;
    var today = new Date()
    var model = {
      id: 2,
      observer_recu: "Prueba2_PUT CORREGIDO",
      num_recu: 5,
      date: today, 
      token_user: token, 
      tipo: "REC",
      motivo: "null",
      codec_recu: "aaaaaarecu"
  }
  }

  public arrLotes : any = [];
  getLotes(codecs: string) {
    const x = codecs.trim().slice(0,15);
    const sliceXa = x.slice(0,5);
    const sliceXb = x.slice(6,9);
    localStorage.setItem('sliceCodeA', sliceXa);

    this.lote.getLoteUnit(sliceXa, sliceXb).subscribe( m => {
      this.arrLotes = m;
      console.log(this.arrLotes)
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
@Component({
  selector: 'recusados-fragment',
  templateUrl: 'recusados-fragment.html',
})
export class recusadosFragment {
  constructor(
    public dialogRef: MatDialogRef<recusadosFragment>
  ) {}
  password = new FormControl("ad123", Validators.required);
  onNoClick(): void {
    this.dialogRef.close();
  }
  yesClick(){
    if(this.password.valid){
      this.dialogRef.close(this.password.value);
    }
  }
}

@Component({
  selector: 'recusados-options',
  templateUrl: 'recusados-options-fragment.html',
})
export class recusadosOptions {
  constructor(
    public dialogRef: MatDialogRef<recusadosOptions>
  ) {}
  select(data:number): void {
    this.dialogRef.close(data);
  }
}
