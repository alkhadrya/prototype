import { Component, OnInit } from '@angular/core';
import { VenteService } from 'src/app/services/vente.service';
import Vente from 'src/app/models/vente.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cartes',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.css']
})
export class ListVenteComponent implements OnInit {

  ventes?: Vente[];
  currentVente?: Vente;
  currentIndex = -1;
  title = '';
  searchTerm = '';
  term = '';
   margin = 0;
   backgroundColor = 'none';
   redColor = '#FFFFFF';
  constructor(private venteService: VenteService) { }

  ngOnInit(): void {
    this.retrieveVentes();
  }

  refreshList(): void {
    this.currentVente = undefined;
    this.currentIndex = -1;
    this.retrieveVentes();
  }

  retrieveVentes(): void {
    this.venteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ventes = data.slice().reverse();
    });
  }

  setActiveVente(vente: Vente, index: number): void {
    this.currentVente = vente;
    this.currentIndex = index;
  }

  removeAllVentes(): void {
    this.venteService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  print(): void{
    window.print();

  }

}
