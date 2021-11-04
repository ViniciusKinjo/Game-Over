import { ModalController } from '@ionic/angular';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  public alertController: AlertController;

  cart: Produto[] = [];

  constructor(alert: AlertController, private CartService: CartService, private modalCtrl: ModalController) {
    this.alertController = alert;
   }

  ngOnInit() {
    this.cart = this.CartService.getCarrinho();
  }

  diminuirCarrinho(Produto){
    this.CartService.diminuirProduto(Produto);
  }

  adicioanrCarrinho(Produto){
    this.CartService.addProduto(Produto);
  }
  removeItem(Produto){
    this.CartService.removerProduto(Produto);
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.preco * j.quantidade, 0);
  }

  close(){
    this.modalCtrl.dismiss();
    }

    checkout(){

    }

  async alerta(): Promise<void>{
    const alerta = await this.alertController.create({
      header: "Compra",
      message: "Compra realizada com sucesso",
      buttons: ['OK']
    });

    alerta.present();
  }
}
