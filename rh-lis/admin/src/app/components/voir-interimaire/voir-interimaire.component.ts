import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import Entreprise from 'src/app/models/entreprise.model';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import Personnel from 'src/app/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import Interimaire from 'src/app/models/interimaire.model';
import { InterimaireService } from 'src/app/services/interimaire.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";
import * as Highcharts from 'highcharts';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'voir-interimaire',
  templateUrl: './voir-interimaire.component.html',
  styleUrls: ['./voir-interimaire.component.css']
})
export class VoirInterimaireComponent implements OnInit, OnChanges {

  @Input() interimaire?: Interimaire;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentInterimaire: Interimaire ={
        cni:"" ,
        datenaiss:"",
        datesignature:"",
        debutcontrat:"",
        dpt:"",
        fincontrat:"",
        formation:"",
        lieu_aff:"",
        lieuaff:"",
        lieunaiss:"",
        lieusignature:"",
        matricule:"" ,
        nationnalite:"",
        nom:"",
        num:"",
        poste:"",
        retenu:"",
        salaire:"",
        salairenet:"",
        tel_1:"",
        tel_2:"",
        type_pay:"",
        typecontrat:"",
        urgence1:"",
        urgence2:"",
        url:"",
    };
  message = '';
  entreprises:any;
  interimaires:any;
  toggle_update=false;

  logins:any;

  arrive='';
  depart='';
  weekly=0;
  monthly=0;
  daily='';
  yearly='';
  abs=1;
  abs_week=0;
  abs_mois=0;
  now = new Date();

  myInterimaire:any;

  title = "cloudsSorage";
  selectedFile: any;
  fb:any;
  downloadURL: any;
  urll="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";

  huit:any;

  retard__week:any;
  retard__mois:any;


  constructor(private loginService: LoginService,private storage: AngularFireStorage,private entrepriseService: EntrepriseService,private personnelService: PersonnelService,private interimaireService: InterimaireService) { }

  ngOnInit(): void {
    this.huit=  this.now.setHours(8, 0, 0); 

    this.myInterimaire=this.currentInterimaire;
    this.message = '';
    this.retrieveEntreprises();
    this.retrieveInterimaires();
    this.retrieveLogins();
  }


  calculateDiff(dateSent:any,currentDate:any){
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

    return this.msToTime(difference_ms);
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



  calcultime(): void{
      var we=0;
      var mo=0;
      var ye=0;
      for(var i = 0, j = this.logins.length - 1; i < this.logins.length; i++, j--){ 
        var datt=new Date(this.logins[j].arrive)
        if(datt.toDateString()==(new Date()).toDateString() && this.logins[j].matricule==this.currentInterimaire.matricule){
          this.myInterimaire.arrive=this.arrive=this.logins[j].arrive;
          this.myInterimaire.depart=this.arrive=this.logins[j].descente;
          this.abs=0;
        }
      }
      
      var pres=0;
      var a=0;
      
//------------------------------------------------------------------------------------------------------

      const start = new Date(this.formatDate(this.startOfWeek(new Date())));
      const end = new Date(this.formatDate(this.now));
      let loop = new Date(start);
      var retard_week=0;
      while (loop <= end) {
        let newDate = loop.setDate(loop.getDate() + 1);
        for (let j = 0; j<this.logins.length; j++) {
          var datt=new Date(this.logins[j].arrive)
            if(this.formatDate(datt)==this.formatDate(loop) && this.logins[j].matricule==this.currentInterimaire.matricule){
            pres++;  
            retard_week=retard_week+this.calculateDif(this.huit,this.logins[j].arrive);
          }
        }
        a++;       
      }
      this.retard__week=this.msToTime(retard_week)
      this.abs_week= a-pres;

//------------------------------------------------------------------------------------------------------
      var pres_mois=0;
      var a_mois=0;


const start_mois = new Date(this.formatDate(this.startOfMonth(new Date())));
const end_mois = new Date(this.formatDate(this.now));

let loop_mois = new Date(start_mois);
var retard_mois=0;
      while (loop_mois <= end_mois) {
        let newDate = loop_mois.setDate(loop_mois.getDate() + 1);
        for (let j = 0; j<this.logins.length; j++) {

          var datt=new Date(this.logins[j].arrive)
            if(this.formatDate(datt)==this.formatDate(loop_mois) && this.logins[j].matricule==this.currentInterimaire.matricule){
            pres_mois++; 
            retard_mois=retard_mois+this.calculateDif(this.huit,this.logins[j].arrive); 
          }
        }
        a_mois++;       
      }
      this.abs_mois= a_mois-pres_mois;
      this.retard__mois=this.msToTime(retard_mois)

  }

  formatDate(date:any){
    return date.toLocaleDateString('en-US', {
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

  ngOnChanges(): void {
    this.huit=  this.now.setHours(8, 0, 0); 
    this.message = '';
    this.abs=1;
    this.currentInterimaire = { ...this.interimaire };
    this.myInterimaire=this.currentInterimaire;
    this.retrieveLogins();
  }

  startOfWeek(date:any){
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
 
  }
  startOfMonth(date:any){  
    return new Date(date.getFullYear(), date.getMonth(), 1);
 
  }

  updatePublished(status: boolean): void {
    if (this.currentInterimaire.key) {
      this.interimaireService.update(this.currentInterimaire.key, { published: status })
      .then(() => {
        // this.currentInterimaire.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
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
      this.calcultime()
  });
}

getweek(currentDate:any){
    currentDate = new Date(currentDate);
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - Number(startDate)) /(24 * 60 * 60 * 1000));
         
    return Math.ceil(days / 7);
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
  updateInterimaire(): void {
    const data =this.currentInterimaire;
    if (this.currentInterimaire.key) {
      this.interimaireService.update(this.currentInterimaire.key, data)
        .then(() => this.message = 'The interimaire was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteInterimaire(): void {
    if (this.currentInterimaire.key) {
      this.interimaireService.delete(this.currentInterimaire.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The interimaire was updated successfully!';
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

   retrieveInterimaires(): void {
    this.interimaireService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.interimaires = data;
    });
  }
  contrat():void{
    window.print();
  }
}
