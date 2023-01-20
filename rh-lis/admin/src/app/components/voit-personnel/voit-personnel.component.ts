import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Entreprise from 'src/app/models/entreprise.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Personnel from 'src/app/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import Interimaire from 'src/app/models/interimaire.model';
import { InterimaireService } from 'src/app/services/interimaire.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import * as Highcharts from 'highcharts';


@Component({
  selector: 'voir-personnel',
  templateUrl: './voit-personnel.component.html',
  styleUrls: ['./voit-personnel.component.css']
})
export class VoitPersonnelComponent implements OnInit, OnChanges {

  @Input() personnel?: Personnel;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPersonnel: Personnel = {
        nom:"",
        privilege:"",
        matricule:"",
        poste:"",
        url:"",
        login:"",
        mdp:""
  };
  message = '';

  toggle_update=false;
  dropdownList :any;
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings_1 = {};
  entreprise: Entreprise = new Entreprise();
  entreprises:any;

  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  admin=false;
  chcompte=false;
  gerant=false;
  personnels:any;
  matricule=sessionStorage.getItem('matricule')

  constructor(private storage: AngularFireStorage,private entrepriseService: EntrepriseService,private personnelService: PersonnelService,private interimaireService: InterimaireService) { }

  ngOnInit(): void {

    this.retrievePersonnels();
    this.retrieveEntreprises();

  }

onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

   retrieveEntreprises(): void {
    this.entrepriseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.entreprises = data;
       this.dropdownList = this.entreprises;
    });
  }
  
  ngOnChanges(): void {
    this.retrieveEntreprises();
  }

  updatePublished(status: boolean): void {
    if (this.currentPersonnel.key) {
      this.personnelService.update(this.currentPersonnel.key, { published: status })
      .then(() => {
        // this.currentPersonnel.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  updatePersonnel(): void {
    const data = {
      nom: this.currentPersonnel.nom,
      privilege: this.currentPersonnel.privilege,
      entreprise: this.currentPersonnel.entreprise,
      matricule: this.currentPersonnel.matricule,
      poste: this.currentPersonnel.poste,
      url: this.currentPersonnel.url,
      login: this.currentPersonnel.login,
      mdp: this.currentPersonnel.mdp,
    };

    if (this.currentPersonnel.key) {
      this.personnelService.update(this.currentPersonnel.key, data)
        .then(() => this.message = 'The personnel was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deletePersonnel(): void {
    if (this.currentPersonnel.key) {
      this.personnelService.delete(this.currentPersonnel.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The personnel was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  profil(){
    if(this.currentPersonnel.privilege=="Chargé de compte"){
      this.chcompte=true;
      this.gerant=false;
      this.currentPersonnel.entreprise="";
    }else if(this.currentPersonnel.privilege=="gerant"){
      this.gerant=true;
      this.chcompte=false;
      this.currentPersonnel.entreprise="";
    }else{
      this.chcompte=false;
      this.gerant=false;
      this.currentPersonnel.entreprise="";
    }
  }

  modif(): void{
    if(this.toggle_update){
      this.toggle_update=false;
    }else{
      this.toggle_update=true; 
    }
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
        }
      }
    });
  }

}
