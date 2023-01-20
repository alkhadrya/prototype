import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Entreprise from '../models/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private dbPath = '/Entreprise';

  entreprisesRef: AngularFireList<Entreprise>;

  constructor(private db: AngularFireDatabase) {
    this.entreprisesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Entreprise> {
    return this.entreprisesRef;
  }

  create(entreprise: Entreprise): any {
    return this.entreprisesRef.push(entreprise);
  }

  update(key: string, value: any): Promise<void> {
    return this.entreprisesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.entreprisesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.entreprisesRef.remove();
  }
}
