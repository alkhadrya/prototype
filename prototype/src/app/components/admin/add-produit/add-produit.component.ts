import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import Produit from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";




@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html', 
  styleUrls: ['./add-produit.component.css']
})

export class AddProduitComponent implements OnInit {
  @ViewChild('userPhoto') userPhoto: any;
  tof=false;
  det=false;
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
        detail:"",
        createat:(Date()).toString()
    };
  submitted = false;
  produits:any;
  categories:any;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  title = "cloudsSorage";
  data_tof=new Array();
  data_detail=new Array();
  photo:any={
    url: "",
    description:""
  }
  detail:any={
    titre: "",
    valeur:""
  }
  constructor(private storage: AngularFireStorage,private produitService: ProduitService ,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveProduits();
    this.retrieveCategories();
  }
    saveProduit(): void {
    this.produit.url=this.data_tof;
    this.produit.detail=this.data_detail;
    if(this.data_tof.length!=0){
      this.produitService.create(this.produit).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newProduit();
      this.data_tof=new Array();
      this.data_detail=new Array();
      this.tof=false;
      this.det=false;
      alert("Produit ajouté avec succés!")
    });
    }else{
      this.newProduit();
      this.data_tof=new Array();
      alert("Il est imperatif d'ajouter une photo");
    }
    
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
        detail:"",
        createat:(Date()).toString()
    };
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
  addTof(){
    this.tof=true;
  }
  addDetail(){
    this.det=true;
  }
  push_tof(){
    this.photo.url=this.fb;
   const data={
      url:this.photo.url,
      description:this.photo.description
    }
    if(this.userPhoto.nativeElement.value!=""){
      this.data_tof.push(data)
      console.log(this.data_tof)
      this.userPhoto.nativeElement.value = "";
    }else{
      alert("Veuiller selectionner une image")
    }
    
    this.photo={
    url: "",
    description:""
  }
  this.tof=false;
  }
   push_detail(){
   const data={
      titre:this.detail.titre,
      valeur:this.detail.valeur
    }
    if(this.detail.titre!=""){
      this.data_detail.push(data)
      this.detail.titre = "";
    }else{
      alert("Veuillez remplir le titre")
    }
    
    this.detail={
    titre: "",
    valeur:""
  }
  this.det=false;
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
  delete(i:any){
    this.data_tof.splice(i, 1);
  }
  d_delete(i:any){
    this.data_detail.splice(i, 1);
  }
}