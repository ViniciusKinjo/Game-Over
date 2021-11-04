import { DadosService } from './../dados.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Ipessoa } from 'src/app/interface/ipessoa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public userRegister: Ipessoa = {};
  private loading: any;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private DadosService: DadosService) {

  }



  async Cadastrar(){
    await this.presentLoading();

    try{
      await this.DadosService.Cadastro(this.userRegister);
    } catch(error){
      console.error(error);

      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  ngOnInit(){}
}
