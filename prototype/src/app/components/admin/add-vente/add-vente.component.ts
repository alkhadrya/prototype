import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import Produit from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import Vente from 'src/app/models/vente.model';
import { VenteService } from 'src/app/services/vente.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";




@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html', 
  styleUrls: ['./add-vente.component.css']
})
export class AddVenteComponent implements OnInit {
  @ViewChild('userPhoto') userPhoto: any;
  tof=false;
  vente: any ={
        total:"", 
        date:(Date()).toString(),
        categorie:"",
        matricule:"",
        prix:"",
        stock:"",
        qte:1,
        produit:"",
        user:"",
        reduction:0,
    };


  submitted = false;
  produits:any;
  ventes:any;
  categories:any;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  title = "cloudsSorage";
  data_tof=new Array();
  photo:any={
    url: "",
    description:""
  }
  currentProduit:any;
  constructor(private storage: AngularFireStorage,private venteService: VenteService, private produitService: ProduitService ,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveProduits();
    this.retrieveVentes();
    this.retrieveCategories();
  }
    saveVente(): void {
    this.vente.produit=this.currentProduit.nom;
    this.vente.matricule=this.currentProduit.matricule;
    this.vente.categorie=this.currentProduit.categorie;
    this.vente.stock=parseInt(this.currentProduit.stock)-parseInt(this.vente.qte)
    this.vente.prix=parseInt(this.vente.prix)-parseInt(this.vente.reduction)
    this.vente.total=parseInt(this.vente.prix)*parseInt(this.vente.qte)
      this.venteService.create(this.vente).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newProduit();
      alert("Produit ajouté avec succés!")
    });    
  }
  newProduit(): void {

    this.submitted = false;
    this.vente ={
      total:"", 
      date:(Date()).toString(),
      categorie:"",
      matricule:"",
      prix:"",
      stock:"",
      qte:1,
      produit:"",
      user:"",
      reduction:0,
    };
  }

  retrieveVentes(): void {
    this.venteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ventes = data;
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
  setActiveVente(): void {
    for (let j = 0; j<this.produits.length; j++){
      if(this.produits[j].key==this.vente.produit){
        this.currentProduit=this.produits[j];
        this.vente.produit=this.currentProduit.nom;
      this.vente.prix=this.currentProduit.prix;
      }
    }
    
  }
  // addTof(){
  //   this.tof=true;
  // }
  // push_tof(){
  //   this.photo.url=this.fb;
  //  const data={
  //     url:this.photo.url,
  //     description:this.photo.description
  //   }
  //   if(this.userPhoto.nativeElement.value!=""){
  //     this.data_tof.push(data)
  //     console.log(this.data_tof)
  //     this.userPhoto.nativeElement.value = "";
  //   }else{
  //     alert("Veuiller selectionner une image")
  //   }
    
  //   this.photo={
  //   url: "",
  //   description:""
  // }
  // this.tof=false;
  // }
  // onFileSelected(event:any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe((url: any) => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }
  // delete(i:any){
  //   this.data_tof.splice(i, 1);
  // }
}
