import { CarrinhoPageModule } from './../carrinho/carrinho.module';
import { CarrinhoService } from './../service/carrinho.service';
import { CarrinhoPage } from './../carrinho/carrinho.page';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CartService } from './../cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Produtos } from 'src/app/interface/produtos';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  ProdutosCarrinho: Observable<any[]>;
  public produtos = new Array<Produtos>();
  private productsSubscription: Subscription;
  cart = {};



  constructor(private CartService: CartService, private modalCtrl: ModalController, private toastCtrl: ToastController, private CarrinhoService: CarrinhoService) {
    this.productsSubscription = this.CartService.getProdutos().subscribe(data =>{
      this.produtos = data;
    })
   }

  ngOnInit() {
    this.ProdutosCarrinho = this.CarrinhoService.getProdutos();

    this.CarrinhoService.carrinho.subscribe(value => {
      console.log('Meu carrinho: ', value);
      this.cart = value;
    })

  }


  async deleteProduto(id: string){
    try{
      await this.CartService.deleteProduto(id);
    } catch(error){
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({message, duration: 2000});
    toast.present();
  }

  addToCart(event, product){
    event.stopPropagation();
    this.CarrinhoService.addToCart(product.id);
  }

  removeFromCart(event, product){
    event.stopPropagation();
    this.CarrinhoService.removeFromCart(product.id);
  }

  async openCart(){
    const modal = await this.modalCtrl.create({
    component: CarrinhoPage
    });
    await modal.present();
  }

}
