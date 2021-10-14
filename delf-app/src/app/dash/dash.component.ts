import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimapacketsService } from '../services/animapackets.service';
import { ControlModulesService } from '../services/control-modules.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

 
  constructor( public mods: ControlModulesService,   
    public an: AnimapacketsService,
    private router: Router) { }

public modsArr: any = [];
public user: any;
  ngOnInit() {
    this.gMods();    
    this.user = sessionStorage.getItem('User_Name');        
  }

  public count: number = 0;

  gMods() {
    this.mods.getModulesGeneral().subscribe( m => {
      this.modsArr = m;
      for( let i = 0; i<=this.modsArr.length; i++ )
      {
        this.an.objectAnim( i, this.modsArr[i].id, 'enteranim ease 1.5s 1', 100 );

        // document.getElementById( `${this.modsArr[i].id}` ).addEventListener( 'click', () => {
        //   this.relink(this.modsArr[i].color_module);
        // })

      }
    })
  }

  relink(link: string, id: any) {
    // for( let i = 0; i<=this.modsArr.length; i++ ) {
      
    // }

    this.an.objectAnim( 1, id, 'outanim ease 1.5s 1', 100)

    setTimeout(() => {
      this.router.navigate([`/${link}`]);
    }, 1000);
    //console.log(link)
  }


}
