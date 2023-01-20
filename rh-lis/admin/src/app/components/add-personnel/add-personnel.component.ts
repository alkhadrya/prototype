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
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css']
})
export class AddPersonnelComponent implements OnInit {
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
        login:"",
        mdp:"passer",
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
  constructor(private storage: AngularFireStorage,private entrepriseService: EntrepriseService,private interimaireService: InterimaireService,private personnelService: PersonnelService) { }

  ngOnInit(): void {
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.dropdownSettings_1 = {
      singleSelection: true,
      idField: 'key',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.retrieveEntreprises();
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
    var login=((this.personnel.privilege)?.slice(0,3))?.toLowerCase()+"00"+(this.personnels.length+1)?.toString()+"@rhlis" ;
    this.personnel.matricule=matricule;
    this.personnel.login=login;
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
        login:"",
        mdp:"passer",
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
    });
  }

}
