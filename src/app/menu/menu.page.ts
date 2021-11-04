import { DadosService } from './../dados.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private DadosService: DadosService) { }

  ngOnInit() {
  }

  async logout(){
    try{
      await this.DadosService.logout();
    } catch(error){
      console.error(error);
    }
  }

}
