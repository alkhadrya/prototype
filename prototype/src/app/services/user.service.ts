import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import User from '../models/dette.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/User';

  dettesRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.dettesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<User> {
    return this.dettesRef;
  }

  create(dette: User): any {
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
