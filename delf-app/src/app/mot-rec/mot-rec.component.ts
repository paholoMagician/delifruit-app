
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlMotivService } from '../services/control-motiv.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-mot-rec',
  templateUrl: './mot-rec.component.html',
  styleUrls: ['./mot-rec.component.css']
})
export class MotRecComponent implements OnInit {
  panelOpenState = true;
  indicator = false;
  public list:any; 
  public descrip_mot: string = '';
  public name_mot: string = '';

  dataSource = ELEMENT_DATA

  constructor(private service: ControlMotivService) { }

  ngOnInit(): void {
    this.loaddata();
  }
  
  savemotivform(){
    const x = sessionStorage.getItem('Code_user')
    const date = new Date();
    let arrLog: any = {      
      name_mot:  this.name_mot,
      descrip_mot: this.descrip_mot,
      date: date,
      token_session: x
    }
    console.log(arrLog);
    this.service.savemotiv(arrLog).subscribe( x => this.loaddata() )
  }

  loaddata(){
    const x = sessionStorage.getItem('Code_user')
    console.log(x)
    console.log("asc")
    this.service.getmotiv(`${x}`, "asc").subscribe( x => 
     { console.log(x)
     this.list = x} )
  }
}  
