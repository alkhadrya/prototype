import { Component, OnInit } from '@angular/core';
import { InterimaireService } from 'src/app/services/interimaire.service';
import Interimaire from 'src/app/models/interimaire.model';
import { map } from 'rxjs/operators';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.css']
})
export class CartesComponent implements OnInit {

  interimaires?: Interimaire[];
  currentInterimaire?: Interimaire;
  currentIndex = -1;
  title = '';
  searchTerm = '';
  term = '';
   margin = 0;
   backgroundColor = 'none';
   redColor = '#FFFFFF';
   correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  constructor(private interimaireService: InterimaireService) { }

  ngOnInit(): void {
    this.retrieveInterimaires();
  }

  refreshList(): void {
    this.currentInterimaire = undefined;
    this.currentIndex = -1;
    this.retrieveInterimaires();
  }

  retrieveInterimaires(): void {
    this.interimaireService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.interimaires = data;
    });
  }

  setActiveInterimaire(interimaire: Interimaire, index: number): void {
    this.currentInterimaire = interimaire;
    this.currentIndex = index;
  }

  removeAllInterimaires(): void {
    this.interimaireService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  print(): void{
    window.print();

  }

}
