import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Categorie from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private dbPath = '/Categorie';

  categoriesRef: AngularFireList<Categorie>;

  constructor(private db: AngularFireDatabase) {
    this.categoriesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Categorie> {
    return this.categoriesRef;
  }

  create(categorie: Categorie): any {
    return this.categoriesRef.push(categorie);
  }

  update(key: string, value: any): Promise<void> {
    return this.categoriesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.categoriesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.categoriesRef.remove();
  }
}
