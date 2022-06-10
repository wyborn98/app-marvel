import { Injectable } from '@angular/core';
import { ServiceService } from '../api/service.service';
import { PaginationComponent } from './../util/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private service: ServiceService) { }

  //Faz uma requisição get com o id selecionado e inserido na url da requisição
  public getPersonagemPorId(id: number){
    return new Promise((ret) => {
      
      this.service.getDados('v1/public/characters/' + id, '').then((data: any) => {
        if(data && data.data && data.data.results){
          ret(data.data.results);
          
        } else {
          ret([]);
        }

      }, (err) => {
        ret(false);

      })
    })
  }

  //Faz uma requisição get que inclui as configurações de Paginação
  public getTodosPersonagens(pagination: PaginationComponent, filter: string){
    let strFilter = '';
    if(filter){
      strFilter = '&nameStartsWith=' + filter; 
    }
    
    let param = '&limit=' + pagination.getLimite() + '&offset=' + pagination.getOffset() + strFilter;
    
    return new Promise((ret) => {
      this.service.getDados('v1/public/characters', param).then((data:any) => {

        if(data && data.data && data.data.results){
          this.atualizarPaginacao(pagination, data.data);

          ret(data.data.results);

        } else {
          ret([]);

        }

      }, (err)=> {
        ret(false);

      });  
    })
    
  }

  //Faz uma requisição get na url que possui o id de um Personagem
  public getQuadrinhosPorPersonagem(character: any){
    return new Promise((ret) => {
      this.service.getDados('v1/public/characters/'+ character.id + '/comics', '').then((data: any) => {
        if(data && data.data && data.data.results){
          ret(data.data.results);          
        } else {
          ret([]);
        }
      }, (err) => {
        ret(false);

      })
    })
  }

  //Configuração da paginação
  private atualizarPaginacao(paginacao: PaginationComponent, data: any){
    paginacao.setTotal(data.total);
    paginacao.setLimite(data.limit);
    paginacao.criarPaginas();
  }
}
