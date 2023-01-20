import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import Parametre from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
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
  login=false;
  Admin=false;
  parametres:any;
  currentParametre:any;
  constructor(public router: Router,private storage: AngularFireStorage,private parametreService: ParametreService) { }

  ngOnInit(): void {
     this.router.navigate(['']);
     this.retrieveParametres()
  }

 verification(){
    if(this.currentPersonnel.login=="axb" && this.currentPersonnel.mdp=="axb"){
      this.login=true;
      this.router.navigate(['home_admin']);
    }else{
      alert("Verifiez vos informations")
    }
  }
  retrieveParametres(): void {
    this.parametreService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.parametres = data;
      this.currentParametre=this.parametres[0]
    });
  }

}

