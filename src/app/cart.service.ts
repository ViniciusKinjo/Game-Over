import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Produto{
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Produto[] = [
    { id: 1, nome: 'FIFA 22', descricao: 'Powered by Football™, EA SPORTS™ FIFA 22 deixa o jogo ainda mais real com avanços fundamentais de jogabilidade e uma nova temporada de inovações em todos os modos.', preco: 249, quantidade: 1, imagem: 'https://img.olhardigital.com.br/wp-content/uploads/2021/09/fifa-22.jpg'},
    { id: 2, nome: 'Battlefield 2042', descricao: 'Battlefield™ 2042 é um jogo de tiro em primeira pessoa que marca o retorno à emblemática guerra total da franquia. Em um mundo num futuro próximo, transformado pela desordem, adapte-se a campos de batalha dinâmicos para superá-los com a ajuda do seu pelotão e de um arsenal de ponta.', preco: 249, quantidade: 1, imagem: 'https://www.gamerpoint.com.br/wp-content/uploads/2021/11/Battlefield-2042.jpg'},
    { id: 3, nome: 'Phasmophobia', descricao: 'Phasmophobia é um terror psicológico cooperativo online para 4 jogadores. A atividade paranormal está aumentando e cabe a você e sua equipe usar todo o equipamento de caça aos fantasmas à sua disposição para reunir o máximo de evidências possível.', preco: 27.89, quantidade: 1, imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/capsule_616x353.jpg?t=1635347530'},
    { id: 4, nome: 'Forza horizon 5', descricao: 'Sua maior aventura Horizon te espera! Explore o mundo aberto vibrante e em constante evolução nas terras mexicanas. Participe de corridas divertidas e sem limites enquanto pilota centenas dos melhores carros do mundo. Comece hoje sua Aventura Horizon e adicione o jogo a sua Lista de Desejos!', preco: 249, quantidade: 1, imagem: 'https://cdn.ome.lt/_zqVQxIbZoCoAR-G_ydxMpKb-Cg=/1200x630/smart/extras/conteudos/Forza-Horizon-5_capa.jpg'},
    { id: 5, nome: 'Hot Wheels Unleashed', descricao: 'Colete os melhores veículos do universo de Hot Wheels™, construa pistas espetaculares e participe de corridas de tirar o fôlego.', preco: 109.99, quantidade: 1, imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1271700/capsule_616x353.jpg?t=1634800185'},
    { id: 6, nome: 'Grand Theft Auto V', descricao: 'Grand Theft Auto V para PC oferece aos jogadores a opção de explorar o gigantesco e premiado mundo de Los Santos e Blaine County em resoluções de até 4K e além, assim como a chance de experimentar o jogo rodando a 60 FPS (quadros por segundo).', preco: 66.66, quantidade: 1, imagem: 'https://ogimg.infoglobo.com.br/in/10306976-f8e-e01/FT1086A/760/2013-646569354-GTA-V-big.jpg_20130917.jpg'},
    { id: 7, nome: 'Valorant Points', descricao: '1200 Valorant Points', preco: 39.90, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLR-CbEeLAsK55UHnF6x1OgQyYfroPJpfJ8K9hys=s900-c-k-c0x00ffffff-no-rj'},
    { id: 8, nome: 'Valorant Points', descricao: '2300 Valorant Points', preco: 74.90, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLR-CbEeLAsK55UHnF6x1OgQyYfroPJpfJ8K9hys=s900-c-k-c0x00ffffff-no-rj'},
    { id: 9, nome: 'Valorant Points', descricao: '4400 Valorant Points', preco: 139.90, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLR-CbEeLAsK55UHnF6x1OgQyYfroPJpfJ8K9hys=s900-c-k-c0x00ffffff-no-rj'},
    { id: 10, nome: 'Valorant Points', descricao: '11500 Valorant Points', preco: 349.90, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLR-CbEeLAsK55UHnF6x1OgQyYfroPJpfJ8K9hys=s900-c-k-c0x00ffffff-no-rj'},
    { id: 11, nome: 'Riot Points', descricao: '1300 Riot Points', preco: 32, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLQgj7owa3zkXBlfwiXKX5zCN10SfQEXChqvJr8QGA=s900-c-k-c0x00ffffff-no-rj'},
    { id: 12, nome: 'Riot Points', descricao: '2600 Riot Points', preco: 64, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLQgj7owa3zkXBlfwiXKX5zCN10SfQEXChqvJr8QGA=s900-c-k-c0x00ffffff-no-rj'},
    { id: 13, nome: 'Riot Points', descricao: '4590 Riot Points', preco: 113, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLQgj7owa3zkXBlfwiXKX5zCN10SfQEXChqvJr8QGA=s900-c-k-c0x00ffffff-no-rj'},
    { id: 14, nome: 'Riot Points', descricao: '13000 Riot Points', preco: 320, quantidade: 1, imagem: 'https://yt3.ggpht.com/ytc/AKedOLQgj7owa3zkXBlfwiXKX5zCN10SfQEXChqvJr8QGA=s900-c-k-c0x00ffffff-no-rj'},
  ];

  private cart = [];
  private quantidadeCarrinho = new BehaviorSubject(0);

  constructor() { }

  getProduto(){
    return this.data;
  }

  getCarrinho(){
    return this.cart;
  }

  getQuantidadeCarrinho(){
    return this.quantidadeCarrinho;
  }

  addProduto(Produto){
    let added = false;
    for(let p of this.cart){
      if(p.id === Produto.id){
        p.quantidade += 1;
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(Produto);
    }
    this.quantidadeCarrinho.next(this.quantidadeCarrinho.value + 1);
  }

  diminuirProduto(Produto){
    for(let [index, p] of this.cart.entries()){
      if(p.id === Produto.id){
        p.quantidade -= 1;
        if(p.quantidade == 0){
          this.cart.splice(index, 1);
        }
      }
    }
    this.quantidadeCarrinho.next(this.quantidadeCarrinho.value -1);
  }

  removerProduto(Produto){
    for(let [index, p] of this.cart.entries()){
      if(p.id === Produto.id){
        this.quantidadeCarrinho.next(this.quantidadeCarrinho.value - p.quantidade);
        this.cart.splice(index, 1);
      }
    }
  }
}
