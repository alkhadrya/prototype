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



@Component({
  selector: 'app-add-interimaire',
  templateUrl: './add-interimaire.component.html',
  styleUrls: ['./add-interimaire.component.css']
})
export class AddInterimaireComponent implements OnInit {

  entreprise: Entreprise = new Entreprise();
  personnel: Personnel = new Personnel();
  interimaire: Interimaire ={
        cni:"" ,
        datenaiss:"",
        datesignature:"",
        debutcontrat:"",
        dpt:"",
        fincontrat:"",
        formation:"",
        lieu_aff:"",
        lieuaff:"",
        lieunaiss:"",
        lieusignature:"",
        matricule:"" ,
        nationnalite:"",
        nom:"",
        num:"",
        poste:"",
        retenu:"",
        salaire:"",
        salairenet:"",
        tel_1:"",
        tel_2:"",
        type_pay:"",
        typecontrat:"",
        urgence1:"",
        urgence2:"",
        url:"",
    };
  submitted = false;
  entreprises:any;
  interimaires:any;

  title = "cloudsSorage";
  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  

  constructor(private storage: AngularFireStorage,private entrepriseService: EntrepriseService,private personnelService: PersonnelService,private interimaireService: InterimaireService) { }

  ngOnInit(): void {
    this.retrieveEntreprises();
    this.retrieveInterimaires();
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

  saveInterimaire(): void {
    var matricule=((this.interimaire.lieuaff)?.slice(0,3))?.toUpperCase()+"/LIS/00"+(this.interimaires.length+1)?.toString() ;
    this.interimaire.matricule=matricule;
    this.interimaire.url=this.fb;
    this.interimaireService.create(this.interimaire).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });

  }
  savePersonnel(): void {
   
  }

  newInterimaire(): void {
    this.submitted = false;
    this.interimaire ={
        cni:"" ,
        datenaiss:"",
        datesignature:"",
        debutcontrat:"",
        dpt:"",
        fincontrat:"",
        formation:"",
        lieu_aff:"",
        lieuaff:"",
        lieunaiss:"",
        lieusignature:"",
        matricule:"" ,
        nationnalite:"",
        nom:"",
        num:"",
        poste:"",
        retenu:"",
        salaire:"",
        salairenet:"",
        tel_1:"",
        tel_2:"",
        type_pay:"",
        typecontrat:"",
        urgence1:"",
        urgence2:"",
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
    });
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

}
