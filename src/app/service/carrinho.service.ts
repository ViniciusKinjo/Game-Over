import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import{ Storage } from '@capacitor/storage';



const CART_STORAGE_KEY = 'meu_carrinho';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho = new BehaviorSubject({});
  cartKey = null;
  carrinhoCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.loadCart();
    this.carrinhoCollection = this.afs.collection('carrinho');
   }

   getProdutos(){
    return this.carrinhoCollection.valueChanges({ idField: 'id'})
   }

  async loadCart(){

    const result = await Storage.get({ key: CART_STORAGE_KEY });
    if (result.value) {
      this.cartKey = result.value;

      this.afs.collection('carrinho').doc(this.cartKey).valueChanges().subscribe((result: any) => {

        this.carrinho.next(result || {});
      });

    } else {
      // Start a new cart
      const fbDocument = await this.afs.collection('carrinho').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.cartKey = fbDocument.id;
      // Store the document ID locally
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });

      // Subscribe to changes
      this.afs.collection('carrinho').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        delete result['lastUpdate'];
        console.log('cart changed: ', result);
        this.carrinho.next(result || {});
      });
    }
  }

  addToCart(id){
    this.afs.collection('carrinho').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  removeFromCart(id){
    this.afs.collection('carrinho').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async checkoutCart(){
    await this.afs.collection('pedidos').add(this.carrinho.value);

    this.afs.collection('carrinho').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}
