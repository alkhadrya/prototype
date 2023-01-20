import { Component, OnInit } from '@angular/core';
import Produit from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  produit: Produit ={
       nom:"",
        achat:"",
        categorie:"", 
        matricule:"",
        prix:"",
        url:"",
        stock:"",
    };
  submitted = false;
  produits:any;

  title = "cloudsSorage";
  selectedFile: any;
  fb="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
  constructor(private storage: AngularFireStorage,private produitService: ProduitService) { }

  ngOnInit(): void {
    this.retrieveProduits();
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
  // le codeur des codeurs the full stack imame 
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  saveProduit(): void {
    this.produit.url=this.fb;
    this.produitService.create(this.produit).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newProduit(): void {

    this.submitted = false;
    this.produit ={
        nom:"",
        achat:"",
        categorie:"", 
        matricule:"",
        prix:"",
        url:"",
        stock:"",
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

}
