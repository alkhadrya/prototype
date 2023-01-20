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
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
  nmbr_interimaire=0;
  nmbr_societe=0;
  nmbr_presents=0;
  nmbr_absents=0;
  partition:any= new Array();
  chart_societe:any= new Array();
  chart_nb:any= new Array();
  chart_presents:any= new Array();
  chart_absents:any= new Array();
  nom=sessionStorage.getItem('nom');
  privilege=sessionStorage.getItem('privilege');



constructor(private loginService: LoginService,private interimaireService: InterimaireService,private entrepriseService: EntrepriseService,private personnelService: PersonnelService) { }


ngOnInit(): void {
    // this.retrieveLogins();
   if(sessionStorage.getItem('privilege')=="Admin"){
      this.admin=true;
    }else if(sessionStorage.getItem('privilege')=="Chargé de compte"){
      this.chcompte=true;
    }else if(sessionStorage.getItem('privilege')=="gerant"){
      this.gerant=true;
    }
    this.retrieveInterimaires();
    
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
      for (let j = 0; j<this.logins.length; j++){
        var datt=new Date(this.logins[j].arrive)
        if(datt.toDateString()==(new Date()).toDateString()){
          this.nmbr_presents++;
        }
      }
    });
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

  retrieveEntreprises(): void {
    this.retrieveLogins();
    this.entrepriseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.entreprises = data;
      this.retrievePersonnels();
      this.nmbr_societe=data.length;
        for (let j = 0; j<this.nmbr_societe; j++){
        var nb=0;
        var nb_pre=0;
        for (let i = 0; i<this.interimaires.length; i++){
            if(this.interimaires[i].lieuaff==this.entreprises[j].nom){
              for (let a = 0; a<this.logins.length; a++){
                var datt=new Date(this.logins[a].arrive)
                if(datt.toDateString()==(new Date()).toDateString() && this.logins[a].matricule==this.interimaires[i].matricule){
                     nb_pre++;
                  }
                }
            nb++;
          }
        }
        var topush={
          name:this.entreprises[j].nom,
          y:nb,
          presents:nb_pre,
          absents:nb-nb_pre
        };

        this.partition.push(topush);
      }
      
      

      for (let a = 0; a<this.partition.length; a++){
        this.chart_societe.push(this.partition[a].name)
        this.chart_nb.push(this.partition[a].y)
        this.chart_presents.push(this.partition[a].presents)
        this.chart_absents.push(this.partition[a].absents)
      }
      Highcharts.chart('container', this.options);
      Highcharts.chart('container2', this.option2);
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
      this.nmbr_interimaire=data.length;
      this.retrieveEntreprises();

    });
  }

  public options: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie'
    },
    title: {
        text: 'Repartition des presents'
    },
    tooltip: {
        pointFormat: '{series.name}: {point.percentage:.1f}%'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Interimares',
        colorByPoint: true,
        data: this.partition
    }]
  }

  public option2 : any={
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Les chiffres du jour',
    align: 'left'
  },
  subtitle: {
    text: '',
    align: 'left'
  },
  xAxis: [{
    categories: this.chart_societe,
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value}',
      style: {
        color: 'red'
      }
    },
    title: {
      text: 'Interimaires',
      style: {
        color: 'red'
      }
    },
    opposite: true

  }, { // Secondary yAxis
    gridLineWidth: 0,
    title: {
      text: 'Interimaires',
      style: {
        color: 'green'
      }
    },
    labels: {
      format: '{value} ',
      style: {
        color: 'green'
      }
    }

  }, { // Tertiary yAxis
    gridLineWidth: 0,
    title: {
      text: '@xb rh-lis statistique',
      style: {
        color: 'blue'
      }
    },
    labels: {
      format: '{value}',
      style: {
        color: 'blue'
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 100,
    verticalAlign: 'top',
    y: 55,
    floating: true,
    backgroundColor:
      // theme
      'rgba(255,255,255,0.25)'
  },
  series: [{
    name: 'Interimaires',
    type: 'column',
    yAxis: 1,
    data: this.chart_nb,
    tooltip: {
      valueSuffix: ' '
    }

  }, {
    name: 'Presents',
    type: 'spline',
    yAxis: 2,
    data:this.chart_presents,
    marker: {
      enabled: false
    },
    dashStyle: 'shortdot',
    tooltip: {
      valueSuffix: ''
    }

  }, {
    name: 'Absents',
    type: 'spline',
    data: this.chart_absents,
    tooltip: {
      valueSuffix: ''
    }
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          floating: false,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: 0,
            y: -6
          },
          showLastLabel: false
        }, {
          labels: {
            align: 'left',
            x: 0,
            y: -6
          },
          showLastLabel: false
        }, {
          visible: false
        }]
      }
    }]
  }
}
}

