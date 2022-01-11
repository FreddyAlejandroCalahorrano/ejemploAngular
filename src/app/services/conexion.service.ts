import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from  '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

export interface Item { nlista: string }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  private itemDoc: AngularFirestoreDocument<Item> | undefined;
  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data};
        })
      })
    );
  }
  nListaItem(){
    return this.items
  }

  addListaItem(item: Item){
    this.itemsCollection.add(item);
  }

  eliminarItem(item: { id: any; }){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.delete();
  }
  editarItem(item: { id: any, nlista: any}){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}
