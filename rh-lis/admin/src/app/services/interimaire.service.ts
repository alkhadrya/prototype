import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Interimaire from '../models/interimaire.model';

@Injectable({
  providedIn: 'root'
})
export class InterimaireService {

  private dbPath = '/User';

  interimairesRef: AngularFireList<Interimaire>;

  constructor(private db: AngularFireDatabase) {
    this.interimairesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Interimaire> {
    return this.interimairesRef;
  }

  create(interimaire: Interimaire): any {
    return this.interimairesRef.push(interimaire);
  }

  update(key: string, value: any): Promise<void> {
    return this.interimairesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.interimairesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.interimairesRef.remove();
  }
}
