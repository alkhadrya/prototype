import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Vente from '../models/vente.model';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private dbPath = '/Vente';

  ventesRef: AngularFireList<Vente>;

  constructor(private db: AngularFireDatabase) {
    this.ventesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Vente> {
    return this.ventesRef;
  }

  create(vente: Vente): any {
    return this.ventesRef.push(vente);
  }

  update(key: string, value: any): Promise<void> {
    return this.ventesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.ventesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.ventesRef.remove();
  }
}
