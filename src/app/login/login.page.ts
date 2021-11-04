import { Component, OnInit } from '@angular/core';
import { Ipessoa } from 'src/app/interface/ipessoa';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DadosService } from './../dados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: Ipessoa = {};
  private loading: any;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private DadosService: DadosService) { }

  ngOnInit() {
  }

  async login(){
    await this.presentLoading();


    try{
      await this.DadosService.login(this.userLogin);
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

}
