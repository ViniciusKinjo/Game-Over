import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Ipessoa } from 'src/app/interface/ipessoa';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

export class DadosService{
  constructor(private afa: AngularFireAuth){}

  login(user: Ipessoa){
    return this.afa.signInWithEmailAndPassword(user.email, user.senha);
  }

  Cadastro(user: Ipessoa){
    return this.afa.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout(){

  }

  getAuth(){
    return this.afa;
  }
}
