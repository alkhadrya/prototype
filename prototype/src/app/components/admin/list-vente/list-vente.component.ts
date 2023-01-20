import { Component, OnInit } from '@angular/core';
import Vente from 'src/app/models/vente.model';
import { VenteService } from 'src/app/services/vente.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Component({
  selector: 'app-list-vente',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.css']
})
export class ListVenteComponent implements OnInit {

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
  ventes:any;
  currentVente:any;
  message='';
  title = "cloudsSorage";
  toggle_update=false;
  selectedFile: any;
  fb:any;
  downloadURL: any;
  selec=false;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  constructor(private storage: AngularFireStorage,private venteService: VenteService) { }

  ngOnInit(): void {
    this.retrieveVentes();
  }
   saveVente(): void {
    this.venteService.create(this.vente).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.newVente();
    });
  }
  newVente(): void {

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
currentIndex = -1;
  searchTerm = '';
  term = '';
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
  setActiveVente(vente: Vente, index: number): void {
    this.currentVente = vente;
    this.currentIndex = index;
  }
  deleteVente(): void {
    if (this.currentVente.key) {
      this.venteService.delete(this.currentVente.key)
        .then(() => {
          this.message = 'The vente was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
  updateVente(): void {
    if(this.selec){
      this.currentVente.url=this.fb;
    }
    
    const data = this.currentVente;

    if (this.currentVente.key) {
      this.venteService.update(this.currentVente.key, data)
        .then(() => this.message = 'The vente was updated successfully!')
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
