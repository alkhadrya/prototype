import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Entreprise from 'src/app/models/entreprise.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'voir-entreprise',
  templateUrl: './voir-entreprise.component.html',
  styleUrls: ['./voir-entreprise.component.css']
})
export class VoirEntrepriseComponent implements OnInit, OnChanges {

  @Input() entreprise?: Entreprise;
  @Output() refreshList: EventEmitter<any> = new EventEmitter(); 
  currentEntreprise: Entreprise = {
    nom: '',
    ninea: '',
    // published: false
  };
  message = '';

  toggle_update=false;

  
  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.message = '';
  }




  ngOnChanges(): void {
    this.message = '';
    this.currentEntreprise = { ...this.entreprise };
  }

  updatePublished(status: boolean): void {
    if (this.currentEntreprise.key) {
      this.entrepriseService.update(this.currentEntreprise.key, { published: status })
      .then(() => {
        // this.currentEntreprise.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateEntreprise(): void {
    const data = {
      nom: this.currentEntreprise.nom,
      ninea: this.currentEntreprise.ninea
    };

    if (this.currentEntreprise.key) {
      this.entrepriseService.update(this.currentEntreprise.key, data)
        .then(() => this.message = 'The entreprise was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteEntreprise(): void {
    if (this.currentEntreprise.key) {
      this.entrepriseService.delete(this.currentEntreprise.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The entreprise was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  modif(): void{
    if(this.toggle_update){
      this.toggle_update=false;
    }else{
      this.toggle_update=true; 
    }
  }
}
