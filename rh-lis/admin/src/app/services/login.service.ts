import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {Login} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private dbPath = '/Login';

  loginsRef: AngularFireList<Login>;

  constructor(private db: AngularFireDatabase) {
    this.loginsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Login> {
    return this.loginsRef;
  }

  create(login: Login): any {
    return this.loginsRef.push(login);
  }

  update(key: string, value: any): Promise<void> {
    return this.loginsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.loginsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.loginsRef.remove();
  }
}