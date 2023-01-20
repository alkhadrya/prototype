import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';
import Personnel from 'src/app/models/personnel.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-personnels',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.css']
})
export class ListPersonnelComponent implements OnInit {

  personnels?: Personnel[];
  currentPersonnel?: Personnel;
  currentIndex = -1;
  title = '';
  searchTerm = '';
  term = '';
  privilege:any;

  constructor(private personnelService: PersonnelService) { }

  ngOnInit(): void {
    this.privilege=sessionStorage.getItem('privilege')
    this.retrievePersonnels();
  }

  refreshList(): void {
    this.currentPersonnel = undefined;
    this.currentIndex = -1;
    this.retrievePersonnels();
  }

  retrievePersonnels(): void {
    this.personnelService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.personnels = data;
    });
  }

  setActivePersonnel(personnel: Personnel, index: number): void {
    this.currentPersonnel = personnel;
    this.currentIndex = index;
  }

  removeAllPersonnels(): void {
    this.personnelService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
