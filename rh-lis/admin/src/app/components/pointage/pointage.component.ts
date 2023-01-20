import { Component, OnInit } from '@angular/core';
import { InterimaireService } from 'src/app/services/interimaire.service';
import Interimaire from 'src/app/models/interimaire.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Entreprise from 'src/app/models/entreprise.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import Personnel from 'src/app/models/personnel.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {


  loginsauj: Array<Login> = [];
  logins: any;
  interimaires?: any;
  currentInterimaire?: Interimaire;
  currentIndex = -1;
  title = '';
  term = '';
  currentPersonnel:any;
  currentEntreprise?: Entreprise;
  searchTerm = '';
  entreprise:any;
  entreprises?:any;
  personnels?: Personnel[];
  matricule=sessionStorage.getItem('matricule');
  admin=false;
  chcompte=false;
  gerant=false;
  societe = new Array();
  privilege=sessionStorage.getItem('privilege');
  constructor(private loginService: LoginService,private interimaireService: InterimaireService,private entrepriseService: EntrepriseService,private personnelService: PersonnelService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('privilege')=="Admin"){
      this.admin=true;
    }else if(sessionStorage.getItem('privilege')=="Chargé de compte"){
      this.chcompte=true;
    }
    this.retrievePersonnels();
  }

  calculateDiff(dateSent:any,currentDate:any){
    if(currentDate==''){
      currentDate = new Date();
    }else{
      currentDate = new Date(currentDate);
    }
    dateSent = new Date(dateSent);
    var date1_ms = currentDate.getTime();
    var date2_ms = dateSent.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date1_ms - date2_ms;

    return this.msToTime(difference_ms);
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
      for(var i = 0, j = this.logins.length - 1; i < this.logins.length; i++, j--){
        var datt=new Date(this.logins[j].arrive)
        if(datt.toDateString()==(new Date()).toDateString()){
          this.loginsauj.push(this.logins[j]);
        }
      }
    });
  }
  retrievePersonnels(): void {
    if(!this.admin){
      this.retrieveLogins();
    }
    // this.retrieveLogins();
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
      this.loginService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.logins=data;
      for(var i = 0, j = this.logins.length - 1; i < this.logins.length; i++, j--){
        var datt=new Date(this.logins[j].arrive)
        if(datt.toDateString()==(new Date()).toDateString()){
          this.loginsauj.push(this.logins[j]);
        }
      }
    });
        for (let j = 0; j<this.entreprise.length; j++){
          for (let i = 0; i<this.loginsauj.length; i++){
              if(this.loginsauj[i].entreprise==this.entreprise[j].nom){
                this.societe.push(this.loginsauj[i])
              }
          }
        }
    });
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
    });
  }
}
