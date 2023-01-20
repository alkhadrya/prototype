import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HighchartsChartModule } from 'highcharts-angular';

 import { QrCodeModule } from 'ng-qrcode';

 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';




import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddPersonnelComponent } from './components/add-personnel/add-personnel.component';
import { VoitPersonnelComponent } from './components/voit-personnel/voit-personnel.component';
import { VoirPersonnelComponent } from './components/voir-personnel/voir-personnel.component';
import { ListPersonnelComponent } from './components/list-personnel/list-personnel.component';
import { ListEntrepriseComponent } from './components/list-entreprise/list-entreprise.component';
import { VoirEntrepriseComponent } from './components/voir-entreprise/voir-entreprise.component';
import { AddEntrepriseComponent } from './components/add-entreprise/add-entreprise.component';
import { ListInterimaireComponent } from './components/list-interimaire/list-interimaire.component';
import { VoirInterimaireComponent } from './components/voir-interimaire/voir-interimaire.component';
import { AddInterimaireComponent } from './components/add-interimaire/add-interimaire.component';
import { PointageComponent } from './components/pointage/pointage.component';
import { AbsencesComponent } from './components/absences/absences.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { ContratComponent } from './components/contrat/contrat.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { CartesComponent } from './components/cartes/cartes.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPersonnelComponent,
    VoitPersonnelComponent,
    VoirPersonnelComponent,
    ListPersonnelComponent,
    ListEntrepriseComponent,
    VoirEntrepriseComponent,
    AddEntrepriseComponent,
    ListInterimaireComponent,
    VoirInterimaireComponent,
    AddInterimaireComponent,
    PointageComponent,
    AbsencesComponent,
    EntrepriseComponent,
    ContratComponent,
    HistoriqueComponent,
    CartesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HighchartsChartModule,
    Ng2SearchPipeModule,
    QrCodeModule,
    NgxQRCodeModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
