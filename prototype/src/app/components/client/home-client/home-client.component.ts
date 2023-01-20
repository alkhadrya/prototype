import { Component, OnInit } from '@angular/core';
import Produit from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import Parametre from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent {

parametre: any ={
       nom:"",
        description:"", 
        icon:"",
    };
  submitted = false;
  parametres:any;
  currentParametre:any;
  message='';
  title = "cloudsSorage";
  toggle_update=false;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  selec=false;
  produits:any;
  categories:any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  is_categorie=new Array();
  currentIndex = -1;
  searchTerm = '';
  term = '';
  currentProduit: any;
  sendmessage="Salam"
  constructor(private storage: AngularFireStorage,private parametreService: ParametreService,private categorieService: CategorieService,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.retrieveParametres();
    this.retrieveProduits();
  }
   saveParametre(): void {
    this.parametreService.create(this.parametre).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newParametre();
    });
  }
  newParametre(): void {

    this.submitted = false;
    this.parametre ={
      nom:"",
        description:"", 
        icon:"",
        createat:(Date()).toString()
    };
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
  setActiveParametre(parametre: Parametre, index: number): void {
    this.currentParametre = parametre;
    this.currentIndex = index;
  }
  deleteParametre(): void {
    if (this.currentParametre.key) {
      this.parametreService.delete(this.currentParametre.key)
        .then(() => {
          this.message = 'The parametre was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateParametre(): void {
    if(this.selec){
      this.currentParametre.url=this.fb;
    }
    
    const data = this.currentParametre;

    if (this.currentParametre.key) {
      this.parametreService.update(this.currentParametre.key, data)
        .then(() => this.message = 'The parametre was updated successfully!')
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
  retrieveCategories(): void {
    this.categorieService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
      
    for (let j = 0; j<this.categories.length; j++){
      this.is_categorie.push(false)
      for (let i = 0; i<this.produits.length; i++){
        if(this.produits[i].categorie==this.categories[j].nom){
          this.is_categorie[j]=true;
        }
      }
    }
    });
  }
  
  retrieveProduits(): void {
    this.produitService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.produits = data;
      this.retrieveCategories();
    });
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
setActiveProduit(produit: Produit, index: number): void {
    this.currentProduit = produit;
    this.currentIndex = index;
    this.sendmessage="Salam, Je suis interessé par le produit "+this.currentProduit.nom+" publié sur votre site avec comme image: "+this.currentProduit.url[0].url;
  }

  buy(produit: Produit, index: number){
    this.setActiveProduit(produit, index)
    // let href="https://wa.me/"+this.currentParametre.contact+"?text="+this.sendmessage;
    // let beforetoken=href.split('&')[0]
    // let token=href.split('&')[1]
    // window.location.href=encodeURI(beforetoken)+"%26"+encodeURI(token);
    window.location.href="https://wa.me/"+this.currentParametre.contact+"?text="+encodeURIComponent('https://humoropedia.com/wp-content/uploads/2014/08/monkey-awesome-photo.jpg');
  }

}
