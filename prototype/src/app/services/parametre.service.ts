import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Parametre from '../models/parametre.model';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  private dbPath = '/Parametre';

  parametresRef: AngularFireList<Parametre>;

  constructor(private db: AngularFireDatabase) {
    this.parametresRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Parametre> {
    return this.parametresRef;
  }

  create(parametre: Parametre): any {
    return this.parametresRef.push(parametre);
  }

  update(key: string, value: any): Promise<void> {
    return this.parametresRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.parametresRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.parametresRef.remove();
  }
}
