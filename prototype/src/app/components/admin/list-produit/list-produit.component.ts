import { Component, OnInit } from '@angular/core';
import Produit from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})

export class ListProduitComponent implements OnInit {

  produit: any ={
       nom:"",
        description:"", 
        icon:"",
        achat:0,
        prix:0,
        matricule:"",
        stock:"",
        url:"",
        categorie:"",
        publish:false,
        createat:(Date()).toString()
    };
  submitted = false;
  produits:any;
  categories:any;
  currentProduit:any;
  message='';
  title = "cloudsSorage";
  toggle_update=false;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  selec=false;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";

  constructor(private storage: AngularFireStorage,private produitService: ProduitService ,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveProduits();
    this.retrieveCategories();
  }
   saveProduit(): void {
    this.produitService.create(this.produit).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newProduit();
    });
  }
  refreshList(): void {
    this.currentProduit = undefined;
    this.currentIndex = -1;
    this.retrieveProduits();
  }
  newProduit(): void {

    this.submitted = false;
    this.produit ={
      nom:"",
        description:"", 
        icon:"",
        achat:0,
        prix:0,
        matricule:"",
        stock:"",
        url:"",
        categorie:"",
        publish:false,
        createat:(Date()).toString()
    };
  }
currentIndex = -1;
  searchTerm = '';
  term = '';
  retrieveProduits(): void {
    this.produitService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.produits = data;
    });
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
  setActiveProduit(produit: Produit, index: number): void {
    this.currentProduit = produit;
    this.currentIndex = index;
    window.scrollTo(0, 0);
    this.toggle_update=false;
  }
  deleteProduit(): void {
    if (this.currentProduit.key) {
      this.produitService.delete(this.currentProduit.key)
        .then(() => {
          this.message = 'The produit was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateProduit(): void {
    if(this.selec){
      this.currentProduit.url=this.fb;
    }
    
    const data = this.currentProduit;

    if (this.currentProduit.key) {
      this.produitService.update(this.currentProduit.key, data)
        .then(() => this.message = 'The produit was updated successfully!')
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
  publish(){
    if(this.currentProduit.publish){
        this.currentProduit.publish=false
    }else if(this.currentProduit.publish==false){
      this.currentProduit.publish=true;
    }
    const data = this.currentProduit;

    if (this.currentProduit.key) {
      this.produitService.update(this.currentProduit.key, data)
        .then(() => this.message = 'The produit was updated successfully!')
        .catch(err => console.log(err));
    }
  }
}
