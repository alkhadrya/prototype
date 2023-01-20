import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { VoirProduitComponent } from './components/voir-produit/voir-produit.component';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { ListPosteComponent } from './components/list-poste/list-poste.component';
import { VoirPosteComponent } from './components/voir-poste/voir-poste.component';
import { AddPosteComponent } from './components/add-poste/add-poste.component';
import { VenteComponent } from './components/vente/vente.component';
import { ListVenteComponent } from './components/list-vente/list-vente.component';
import { VoirVenteComponent } from './components/voir-vente/voir-vente.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProduitComponent,
    VoirProduitComponent,
    ListProduitComponent,
    ListPosteComponent,
    VoirPosteComponent,
    AddPosteComponent,
    VenteComponent,
    ListVenteComponent,
    VoirVenteComponent,
    InventaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
