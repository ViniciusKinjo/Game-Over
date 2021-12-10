import { CarrinhoService } from './../service/carrinho.service';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  public alertController: AlertController;
  produtos = [];


  constructor(private alert: AlertController, private CartService: CartService, private modalCtrl: ModalController, private CarrinhoService: CarrinhoService) {
    this.alertController = alert;
   }

  ngOnInit() {
    const CarrinhoItems = this.CarrinhoService.carrinho.value;
    console.log('carrinho: ', CarrinhoItems);
    this.CartService.getProdutos().pipe(take(1)).subscribe(TodosProdutos =>{
      this.produtos = TodosProdutos.filter(p => CarrinhoItems[p.id]).map(produto => {
        return {...produto, count: CarrinhoItems[produto.id]};
      });
      console.log('Produtos: ',this.produtos)
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout(){
    const alerta = await this.alertController.create({
      header: "Compra",
      message: "Compra realizada com sucesso",
      buttons: ['OK']
    });

    alerta.present();
    this.CarrinhoService.checkoutCart();
    this.modalCtrl.dismiss();
  }

}
