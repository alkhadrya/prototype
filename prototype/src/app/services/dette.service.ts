import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Dette from '../models/dette.model';

@Injectable({
  providedIn: 'root'
})
export class DetteService {

  private dbPath = '/Dette';

  dettesRef: AngularFireList<Dette>;

  constructor(private db: AngularFireDatabase) {
    this.dettesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Dette> {
    return this.dettesRef;
  }

  create(dette: Dette): any {
    return this.dettesRef.push(dette);
  }

  update(key: string, value: any): Promise<void> {
    return this.dettesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.dettesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dettesRef.remove();
  }
}
