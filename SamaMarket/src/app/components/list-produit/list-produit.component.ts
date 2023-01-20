import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/services/produit.service';
import Produit from 'src/app/models/produit.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cartes',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {

  produits?: Produit[];
  currentProduit:any;
  currentIndex = -1;
  title = '';
  searchTerm = '';
  term = '';
   margin = 0;
   backgroundColor = 'none';
   redColor = '#FFFFFF';
   message='';
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.retrieveProduits();
  }

  refreshList(): void {
    this.currentProduit = undefined;
    this.currentIndex = -1;
    this.retrieveProduits();
  }

  retrieveProduits(): void {
    this.produitService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.produits = data.slice().reverse();
    });
  }

  setActiveProduit(produit: Produit, index: number): void {
    this.currentProduit = produit;
    this.currentIndex = index;
  }

  removeAllProduits(): void {
    this.produitService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  print(): void{
    window.print();
  }

  updateProduit(): void {
    const data =this.currentProduit;
    if (this.currentProduit.key) {
      this.produitService.update(this.currentProduit.key, data)
        .then(() => this.message = 'The produit was updated successfully!')
        .catch(err => console.log(err));
    }
  }

}
