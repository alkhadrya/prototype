import { Component, OnInit } from '@angular/core';
import { InterimaireService } from 'src/app/services/interimaire.service';
import Interimaire from 'src/app/models/interimaire.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Entreprise from 'src/app/models/entreprise.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import Personnel from 'src/app/models/personnel.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interimaires',
  templateUrl: './list-interimaire.component.html',
  styleUrls: ['./list-interimaire.component.css']
})
export class ListInterimaireComponent implements OnInit {

  interimaires?: any;
  currentInterimaire?: Interimaire;
  currentIndex = -1;
  title = '';
  term = '';
  currentPersonnel:any;
  currentEntreprise?: Entreprise;
  searchTerm = '';
  entreprise:any;
  entreprises?:any;
  personnels?: Personnel[];
  matricule=sessionStorage.getItem('matricule');
  admin=false;
  chcompte=false;
  gerant=false;
  societe = new Array();


  constructor(private interimaireService: InterimaireService,private entrepriseService: EntrepriseService,private personnelService: PersonnelService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('privilege')=="Admin"){
      this.admin=true;
    }else if(sessionStorage.getItem('privilege')=="Chargé de compte"){
      this.chcompte=true;
    }else if(sessionStorage.getItem('privilege')=="gerant"){
      this.gerant=true;
    }
    this.retrieveEntreprises();
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

  retrievePersonnels(): void {
    this.personnelService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.personnels = data;
      for (let j = 0; j<this.personnels.length; j++){
        if(this.personnels[j].matricule==this.matricule){
          this.currentPersonnel=this.personnels[j];
          this.entreprise=this.personnels[j].entreprise;
          console.log(this.entreprise)
        }
      }
        for (let j = 0; j<this.entreprise.length; j++){
          for (let i = 0; i<this.interimaires.length; i++){
              if(this.interimaires[i].lieuaff==this.entreprise[j].nom){
                this.societe.push(this.interimaires[i])
              }
          }
        }
        console.log(this.societe)
    });
  }

  retrieveEntreprises(): void {
    this.retrieveInterimaires();
    this.entrepriseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.entreprises = data;
      this.retrievePersonnels()
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

}
