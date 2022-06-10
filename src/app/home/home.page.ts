import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { CharacterService } from './../provider/character.service';
import { PaginationComponent } from '../util/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public characters : any=[];
  
  /* objeto utilizado para controlar o filtro */
  public filtro   = { 
      descricao   : '',
      bkp         : ''
  };
    
  public paginacao = new PaginationComponent();
  public checking   = true;

  constructor(private characterService: CharacterService, private navCtrl: NavController) {
    this.paginacao.setLimite(10);
    this.getTodosPersonagens();

  }

  /* recupera personagens de acordo com a paginação */
  public getTodosPersonagens(){
      this.checking = true;
      
      /* verifica filtro e reseta paginação */
      if(this.filtro.descricao != this.filtro.bkp){
          this.paginacao.reset();
      }
      
      this.characterService.getTodosPersonagens(this.paginacao, this.filtro.descricao).then((characters:any) => {
          this.filtro.bkp = this.filtro.descricao;
          this.characters = [];
          this.characters = characters;
          this.checking = false;
      });
  }

  public goFirstPage(){
      this.paginacao.setCurrentPage(1);
      this.getTodosPersonagens();
  }

  public goLastPage(){
      this.paginacao.setCurrentPage(this.paginacao.getPages()[this.paginacao.getPages().length - 1]);
      this.getTodosPersonagens();
  }

  public goPreviousPage(){
      this.paginacao.setCurrentPage(this.paginacao.getCurrentPage() - 1);
      this.getTodosPersonagens();
  }

  public goNextPage(){
      this.paginacao.setCurrentPage(this.paginacao.getCurrentPage() + 1);
      this.getTodosPersonagens();
  }

  public goPage(page: number){
      this.paginacao.setCurrentPage(page);
      this.getTodosPersonagens();
  }
  /* --- */

  /* vai para os detalhes do personagem */
  public goDetails(character: any){
    this.navCtrl.navigateForward('character', {
        queryParams: { id: character.id }
    });
  }   

}
