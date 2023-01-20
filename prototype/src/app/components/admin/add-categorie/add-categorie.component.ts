import { Component, OnInit } from '@angular/core';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  categorie: any ={
       nom:"",
        description:"", 
        icon:"",
        createat:(Date()).toString()
    };
  submitted = false;
  categories:any;

  title = "cloudsSorage";
  constructor(private storage: AngularFireStorage,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }
   saveCategorie(): void {
    this.categorieService.create(this.categorie).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newCategorie();
      alert("Catégorie ajouté avec succés!")
    });
  }
  newCategorie(): void {

    this.submitted = false;
    this.categorie ={
       nom:"",
        description:"", 
        icon:"",
        createat:(Date()).toString()
    };
  }

  retrieveCategories(): void {
    this.categorieService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
    });
  }

}
