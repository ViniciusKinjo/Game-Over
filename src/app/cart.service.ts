import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produtos } from 'src/app/interface/produtos'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private produtoCollection: AngularFirestoreCollection<Produtos>;

  constructor(private afs: AngularFirestore) {
    this.produtoCollection = this.afs.collection<Produtos>('Produtos');

   }

   getProdutos(){
    return this.produtoCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data};
        });
      })
    );
  }

  addProduto(produto: Produtos){
    return this.produtoCollection.add(produto);
  }

  getProduto(id: string){
    return this.produtoCollection.doc<Produtos>(id).valueChanges();
  }

  updateProduto(id: string, produto: Produtos){
    return this.produtoCollection.doc<Produtos>(id).update(produto);
  }

  deleteProduto(id: string){
    return this.produtoCollection.doc(id).delete();
  }

}
