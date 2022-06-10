import { CharacterService } from './../../provider/character.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage {
  /* id para testes: 1011334 */

  public character = {
    id: 0,
    comics: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    description: '',
    events: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    modified: '',
    name: '',
    resourceURI: '',
    series: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    stories: {
        available: 0, 
        collectionURI: '', 
        items: [], 
        returned: 0
    },
    thumbnail: {
        path: '', 
        extension: ''
    },
    urls : []
}

  public comics    : any=[];
  public id        : number;
  public checking  = true;

  constructor(private characterService: CharacterService, 
              private route: ActivatedRoute, private navCtrl: NavController) { 

    this.route.queryParams.subscribe(params => {
      let id = params['id'];

      if(id){
        this.characterService.getPersonagemPorId(id).then(character => {
          this.character = character[0] || this.character;
          
          if(this.character){
              this.getQuadrinhosPorPersonagem();
          }
        });
      }
    });
  }

  public getQuadrinhosPorPersonagem(){
    this.checking = true;

    this.characterService.getQuadrinhosPorPersonagem(this.character).then((comics) => {
        this.comics   = comics;
        this.checking = false;
    });
  }

  public goHome(character: any){
    this.navCtrl.navigateBack('home',       
    );
  }  

}
