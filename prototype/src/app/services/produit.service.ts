import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Produit from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private dbPath = '/Produit';

  produitsRef: AngularFireList<Produit>;

  constructor(private db: AngularFireDatabase) {
    this.produitsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Produit> {
    return this.produitsRef;
  }

  create(produit: Produit): any {
    return this.produitsRef.push(produit);
  }

  update(key: string, value: any): Promise<void> {
    return this.produitsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.produitsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.produitsRef.remove();
  }
}
