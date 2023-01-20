import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dropdownList :any;
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings_1 = {};
  entreprise: Entreprise = new Entreprise();
  personnel: Personnel ={
        nom:"",
        privilege:"",
        entreprise:"", 
        matricule:"",
        poste:"",
        url:"",
    };
    currentPersonnel ={
        login:"",
        mdp:"",
        matricule:"",
        nom:"",
        privilege:"",
        entreprise:"", 
        poste:"",
        url:"",
    };
  submitted = false;
  entreprises:any;
  personnels:any;

  title = "cloudsSorage";
  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  chcompte=false;
  gerant=false;
  login=false;
  etat=0;
  privilege:any;
  url=sessionStorage.getItem('url')
  constructor(private storage: AngularFireStorage,private entrepriseService: EntrepriseService,private interimaireService: InterimaireService,private personnelService: PersonnelService) { }

  ngOnInit(): void {
    this.url=sessionStorage.getItem('url');
    this.privilege= sessionStorage.getItem('privilege')
    this.retrievePersonnels();
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
  // le codeur des codeurs the full stack imame 
onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  savePersonnel(): void {
    var matricule=((this.personnel.privilege)?.slice(0,3))?.toUpperCase()+"/LIS/00"+(this.personnels.length+1)?.toString() ;
    this.personnel.matricule=matricule;
    this.personnel.url=this.fb;
    this.personnelService.create(this.personnel).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  profil(){
    if(this.personnel.privilege=="Chargé de compte"){
      this.chcompte=true;
      this.gerant=false;
      this.personnel.entreprise="";
    }else if(this.personnel.privilege=="gerant"){
      this.gerant=true;
      this.chcompte=false;
      this.personnel.entreprise="";
    }else{
      this.chcompte=false;
      this.gerant=false;
      this.personnel.entreprise="";
    }
  }

  newPersonnel(): void {

    this.submitted = false;
    this.personnel ={
        nom:"",
        privilege:"",
        entreprise:"", 
        matricule:"",
        poste:"",
        url:"",
    };
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

  retrievePersonnels(): void {
    this.personnelService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.personnels = data;
       this.verification_1();
    });
  }


  verification_1(){
    for (let j = 0; j<this.personnels.length; j++){
      if(sessionStorage.getItem('login')==this.personnels[j].login && this.personnels[j].mdp==sessionStorage.getItem('mdp')){
        this.login=true;
      }
    }
  }

  verification(){
    for (let j = 0; j<this.personnels.length; j++) {
      if(this.currentPersonnel.login==this.personnels[j].login){
        if(this.currentPersonnel.mdp==this.personnels[j].mdp){
          this.etat=1;
          this.currentPersonnel.matricule=this.personnels[j].matricule;
          this.currentPersonnel.nom=this.personnels[j].nom;
          this.currentPersonnel.privilege=this.personnels[j].privilege;
          this.currentPersonnel.entreprise=this.personnels[j].entreprise;
          this.currentPersonnel.poste=this.personnels[j].poste;
          this.currentPersonnel.url=this.personnels[j].url;
          break;
        }else{  
          this.etat=2;
          break;
        }
      }else{
        this.etat=3;
      }
    }
    if(this.etat==1){
      sessionStorage.setItem('login', this.currentPersonnel.login);
      sessionStorage.setItem('mdp', this.currentPersonnel.mdp);
      sessionStorage.setItem('matricule', this.currentPersonnel.matricule);
      sessionStorage.setItem('nom', this.currentPersonnel.nom);
      sessionStorage.setItem('privilege', this.currentPersonnel.privilege);
      sessionStorage.setItem('entreprise', this.currentPersonnel.entreprise);
      sessionStorage.setItem('poste', this.currentPersonnel.poste);
      sessionStorage.setItem('url', this.currentPersonnel.url);
      this.login=true;
      this.privilege=sessionStorage.getItem('privilege')
    }else if(this.etat==2){
      alert("mot de passe incorrect")
    }else if(this.etat==3){
      alert("Vous n'etes pas inscrit")
    }
    this.currentPersonnel ={
        login:"",
        mdp:"",
        matricule:"",
        nom:"",
        privilege:"",
        entreprise:"", 
        poste:"",
        url:"",
    };
  }

  destroy(){
    window.location.reload()
    window.sessionStorage.clear();
  }
}

