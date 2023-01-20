import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Personnel from '../models/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  private dbPath = '/Personnel';

  personnelsRef: AngularFireList<Personnel>;

  constructor(private db: AngularFireDatabase) {
    this.personnelsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Personnel> {
    return this.personnelsRef;
  }

  create(personnel: Personnel): any {
    return this.personnelsRef.push(personnel);
  }

  update(key: string, value: any): Promise<void> {
    return this.personnelsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.personnelsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.personnelsRef.remove();
  }
}
