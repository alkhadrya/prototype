import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Entreprise from 'src/app/models/entreprise.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import Personnel from 'src/app/models/personnel.model';
import { InterimaireService } from 'src/app/services/interimaire.service';
import Interimaire from 'src/app/models/interimaire.model';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-entreprises',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.css']
})
export class ListEntrepriseComponent implements OnInit {

  interimaires?: any;
  entreprises?:any;
  currentPersonnel:any;
  currentEntreprise: any;
  currentIndex = -1;
  title = '';
  searchTerm = '';
  term = '';
  entreprise:any;
  personnels?: Personnel[];
  matricule=sessionStorage.getItem('matricule');
  admin=false;
  chcompte=false;
  gerant=false;
  societe = new Array();
  detail=false;
  myInterimaire = new Array();
  myInterimair_e = new Array();
  debut=new Date();
  fin=new Date();
  logins:any;
  now = new Date();
  huit:any;
  constructor(private loginService: LoginService,private entrepriseService: EntrepriseService,private personnelService: PersonnelService,private interimaireService: InterimaireService) { }

  ngOnInit(): void {
    this.huit=  this.now.setHours(8, 0, 0); 
    if(sessionStorage.getItem('privilege')=="Admin"){
      this.admin=true;
    }else if(sessionStorage.getItem('privilege')=="Chargé de compte"){
      this.chcompte=true;
    }else if(sessionStorage.getItem('privilege')=="gerant"){
      this.gerant=true;
    }
    this.retrieveEntreprises();

  }

  refreshList(): void {
    this.currentEntreprise = undefined;
    this.currentIndex = -1;
    this.retrieveEntreprises();
    this.retrieveLogins();
  }

  retrieveEntreprises(): void {
    this.entrepriseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.entreprises = data;
      this.retrievePersonnels();
      this.retrieveLogins();
    });
  }

  setActiveEntreprise(entreprise: Entreprise, index: number): void {
    this.currentEntreprise = entreprise;
    this.currentIndex = index;
  }

  removeAllEntreprises(): void {
    this.entrepriseService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  retrievePersonnels(): void {
    this.personnelService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.personnels = data;
      for (let j = 0; j<this.personnels.length; j++){
        if(this.personnels[j].matricule==this.matricule){
          this.currentPersonnel=this.personnels[j];
          this.entreprise=this.personnels[j].entreprise;
          console.log(this.entreprise)
        }
      }
        for (let j = 0; j<this.entreprise.length; j++){
          for (let i = 0; i<this.entreprises.length; i++){
              if(this.entreprises[i].nom==this.entreprise[j].nom){
                this.societe.push(this.entreprises[i])
              }
          }
        }
        console.log(this.societe)
    });
  }

  fdetail(){
    this.detail=true;
    this.retrieveLogins();
    this.retrieveInterimaires();
    this.valider();
  }
  retrieveInterimaires(): void {
    this.interimaireService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.interimaires = data;
        for (let i = 0; i<this.interimaires.length; i++){
          if(this.interimaires[i].lieuaff==this.currentEntreprise.nom){
            this.myInterimaire.push(this.interimaires[i])
          }
        }
    });
  }
  valider(){
    this.term = '';
    this.myInterimair_e=new Array();
    for (let i = 0; i<this.myInterimaire.length; i++){
    var pres=0;
    var a=0;
    const start = new Date(this.debut);
    const end = new Date(this.fin);
    let loop = new Date(start);
    var retard=0;
      while (loop <= end) {
        let newDate = loop.setDate(loop.getDate() + 1);
        a++;       
      }
        for (let j = 0; j<this.logins.length; j++) {
          var datt=new Date(this.logins[j].arrive)
            if((datt>=start && datt<=end) && this.logins[j].matricule==this.myInterimaire[i].matricule){
            pres++; 
            retard=retard+this.calculateDif(this.huit,this.logins[j].arrive); 
          }
        }
      var data={
        nom:this.myInterimaire[i].nom,
        matricule:this.myInterimaire[i].matricule,
        fin:this.myInterimaire[i].fincontrat,
        present:pres,
        absences:a-pres,
        retard:this.msToTime(retard)
      }
      this.myInterimair_e.push(data)
  }
}
  formatDate(date:any){
    return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    })
  }
  formatHour(date:any){
    return date.toLocaleDateString('default', {
    hour: '2-digit',
    minute: '2-digit',
    })
  }
  calculateDif(dateSent:any,currentDate:any){
    if(currentDate==''){
      currentDate = new Date("Sun Sep 18 2022 17:00:00 GMT+0000 (heure moyenne de Greenwich)");
    }else{
      currentDate = new Date(currentDate);
    }
    dateSent = new Date(dateSent);
    var date1_ms = currentDate.getTime();
    var date2_ms = dateSent.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date1_ms - date2_ms;

    return difference_ms;
  }
  msToTime(duration:any) {
  var milliseconds = (parseInt(duration) % 1000) / 100,
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  var hour = (hours < 10) ? "0" + hours : hours;
  var minute = (minutes < 10) ? "0" + minutes : minutes;
  var second = (seconds < 10) ? "0" + seconds : seconds;

  return hour + "h" + minute + "mn" + second + "s";
}
retrieveLogins(): void {
    this.loginService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.logins=data;
  });
}
}
