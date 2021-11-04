import { CarrinhoPage } from './../carrinho/carrinho.page';
import { BehaviorSubject } from 'rxjs';
import { CartService, Produto } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  cart = [];
  Produto = [];
  quantidadeCarrinho: BehaviorSubject<number>;

  constructor(private CartService: CartService, private modalCtrl: ModalController) {

   }

  ngOnInit() {
    this.Produto = this.CartService.getProduto();
    this.cart = this.CartService.getCarrinho();
    this.quantidadeCarrinho = this.CartService.getQuantidadeCarrinho();
  }

  addCarrinho(Produto){
    this.CartService.addProduto(Produto);
  }

  async abrirCarrinho(){
    let modal = await this.modalCtrl.create({
      component: CarrinhoPage,
    });
    modal.present();
  }

}
