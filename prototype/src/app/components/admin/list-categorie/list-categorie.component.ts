import { Component, OnInit } from '@angular/core';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {

  categorie: any ={
       nom:"",
        description:"", 
        icon:"",
    };
  submitted = false;
  categories:any;
  currentCategorie:any;
  message='';
  title = "cloudsSorage";
  toggle_update=false;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  selec=false;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  constructor(private storage: AngularFireStorage,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }
   saveCategorie(): void {
    this.categorieService.create(this.categorie).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newCategorie();
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
currentIndex = -1;
  searchTerm = '';
  term = '';
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
  setActiveCategorie(categorie: Categorie, index: number): void {
    this.currentCategorie = categorie;
    this.currentIndex = index;
  }
  deleteCategorie(): void {
    if (this.currentCategorie.key) {
      this.categorieService.delete(this.currentCategorie.key)
        .then(() => {
          this.message = 'The categorie was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateCategorie(): void {
    if(this.selec){
      this.currentCategorie.url=this.fb;
    }
    
    const data = this.currentCategorie;

    if (this.currentCategorie.key) {
      this.categorieService.update(this.currentCategorie.key, data)
        .then(() => this.message = 'The categorie was updated successfully!')
        .catch(err => console.log(err));
    }
    this.modif();
  }
  modif(): void{
    if(this.toggle_update){
      this.toggle_update=false;
    }else{
      this.toggle_update=true; 
    }
  }
  onFileSelected(event:any) {
    this.selec=true;
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

}
