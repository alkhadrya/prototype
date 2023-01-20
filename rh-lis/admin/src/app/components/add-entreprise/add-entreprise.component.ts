import { Component, OnInit } from '@angular/core';
import Entreprise from 'src/app/models/entreprise.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Personnel from 'src/app/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.css']
})
export class AddEntrepriseComponent implements OnInit {

  entreprise: Entreprise = {
    datesignature:"",
    debutpartenariat:"",
    finpartenariat:"",
    lieusignature:"",
    ninea:"",
    nom:"",
    representant:"",
    typepayment:"",
    valeurpayment:"",    
  };
  personnel: Personnel = new Personnel();
  submitted = false; 
  entreprises:any;

  constructor(private entrepriseService: EntrepriseService,private personnelService: PersonnelService) { }

  ngOnInit(): void {
    this.retrieveEntreprises();
  }

  saveEntreprise(): void {
    this.entrepriseService.create(this.entreprise).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });

    this.personnel.nom=this.entreprise.representant;
    this.personnel.entreprise=this.entreprise.nom;
    this.personnel.poste="";
    this.personnel.matricule=((this.entreprise.nom)?.slice(0,3))?.toUpperCase()+"/LIS/00"+(this.entreprises.length+1)?.toString() ;
    this.personnel.privilege="gérant";
     this.personnelService.create(this.personnel).then(() => {
      console.log('Created new item successfully!');
    });
  }
  savePersonnel(): void {
   
  }

  newEntreprise(): void {
    this.submitted = false;
    this.entreprise = {
      datesignature:"",
      debutpartenariat:"",
      finpartenariat:"",
      lieusignature:"",
      ninea:"",
      nom:"",
      representant:"",
      typepayment:"",
      valeurpayment:"",    
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

}
