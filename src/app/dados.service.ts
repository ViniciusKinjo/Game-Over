import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Ipessoa } from 'src/app/interface/ipessoa';


@Injectable({
  providedIn: 'root'
})

export class DadosService{
  constructor(private afa: AngularFireAuth){}

  login(){

  }

  Cadastro(user: Ipessoa){
    return this.afa.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout(){

  }

  getAuth(){

  }
}
