import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Produtos } from 'src/app/interface/produtos';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, ActivatedRouteSnapshot, PreloadAllModules } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage implements OnInit {
  private produtoId: string = null;
  public produto: Produtos = {};
  private loading: any;
  private produtoSubscription: Subscription;


  constructor(private CartService: CartService,
    private navCtrl: NavController,
    private LoadingController: LoadingController,
    private toastCtrl: ToastController,
    private activateRout: ActivatedRoute) {
    this.produtoId = this.activateRout.snapshot.params['id'];

    if(this.produtoId) this.CarregarProduto();
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.produtoSubscription) this.produtoSubscription.unsubscribe();
  }

  CarregarProduto(){
    this.produtoSubscription = this.CartService.getProduto(this.produtoId).subscribe(data => {
      this.produto = data;
    })
  }

  async saveProduto(){
    await this.presentLoading();

    if(this.produtoId){
      try{
        await this.CartService.updateProduto(this.produtoId, this.produto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/principal');
      } catch(error){
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      try{
        await this.CartService.addProduto(this.produto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/principal');
      } catch(error){
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading(){
    this.loading = await this.LoadingController.create({message: 'Aguarde...'});
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({message, duration: 2000});
    toast.present();
  }

}
