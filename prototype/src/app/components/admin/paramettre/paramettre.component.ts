import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import Parametre from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";


@Component({
  selector: 'app-paramettre',
  templateUrl: './paramettre.component.html', 
  styleUrls: ['./paramettre.component.css']
})
export class ParamettreComponent implements OnInit {
  @ViewChild('userPhoto') userPhoto: any;
  tof=false;
  det=false;
  parametre: any ={
       nom:"",
        description:"", 
        color:"",
        logo:"",
        url:"",
        contact:"", 
        adresse:"",
        type:"",
        tiktok:"",
        facebook:"",
        instagram:"",
        tweeter:"",
        linkedin:"",
        youtube:"",
    };
  submitted = false;
  parametres:any;
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
  message='';
  fbb="";
  constructor(private storage: AngularFireStorage,private parametreService: ParametreService ,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.retrieveParametres();
    this.retrieveCategories();
  }
    saveParametre(): void {
    this.parametre.logo=this.fbb;
    if(this.parametres.length!=0){
      this.deleteParametre()
    }
    this.parametre.url=this.data_tof;
    this.parametre.detail=this.data_detail;
    if(this.data_tof.length!=0){
       this.deleteParametre()
      this.parametreService.create(this.parametre).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.retrieveParametres();
      this.tof=false;
      this.det=false;
      alert("Parametre ajouté avec succés!");
    });
    }else{
      this.retrieveParametres()
      alert("Il est imperatif d'ajouter une photo");
    }
    
  }
  newParametre(): void {

    this.submitted = false;
    this.parametre ={
       nom:"",
        description:"", 
        color:"",
        logo:"",
        url:"",
        contact:"",
        adresse:"",
        type:"",
        tiktok:"",
        facebook:"",
        instagram:"",
        tweeter:"",
        linkedin:"",
        youtube:"",
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
      if(this.parametres.length!=0){
      this.parametre=this.parametres[0];
      this.data_tof=this.parametres[0].url;
    }
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
  deleteParametre(): void {
      this.parametreService.deleteAll()
        .then(() => {
          this.message = 'The parametre was updated successfully!';
        })
        .catch(err => console.log(err));
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
  onFileSelectedd(event:any) {
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
              this.fbb = url;
            }
            console.log(this.fbb);
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
