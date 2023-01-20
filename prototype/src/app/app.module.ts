import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { AddProduitComponent } from './components/admin/add-produit/add-produit.component';
import { AddCategorieComponent } from './components/admin/add-categorie/add-categorie.component';
import { AddVenteComponent } from './components/admin/add-vente/add-vente.component';
import { AddDetteComponent } from './components/admin/add-dette/add-dette.component';
import { ListDetteComponent } from './components/admin/list-dette/list-dette.component';
import { ListVenteComponent } from './components/admin/list-vente/list-vente.component';
import { ListProduitComponent } from './components/admin/list-produit/list-produit.component';
import { ListCategorieComponent } from './components/admin/list-categorie/list-categorie.component';
import { VoirCategorieComponent } from './components/admin/voir-categorie/voir-categorie.component';
import { VoirProduitComponent } from './components/admin/voir-produit/voir-produit.component';
import { VoirDetteComponent } from './components/admin/voir-dette/voir-dette.component';
import { VoirVenteComponent } from './components/admin/voir-vente/voir-vente.component';
import { InventaireComponent } from './components/admin/inventaire/inventaire.component';
import { ParamettreComponent } from './components/admin/paramettre/paramettre.component';
import { HomeClientComponent } from './components/client/home-client/home-client.component';
import { DetailProduitComponent } from './components/client/detail-produit/detail-produit.component';
import { DetailCategorieComponent } from './components/client/detail-categorie/detail-categorie.component';
import { ClistCategorieComponent } from './components/client/clist-categorie/clist-categorie.component';
import { ClistProduitComponent } from './components/client/clist-produit/clist-produit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AfficheComponent } from './components/admin/affiche/affiche.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    AddProduitComponent,
    AddCategorieComponent,
    AddVenteComponent,
    AddDetteComponent,
    ListDetteComponent,
    ListVenteComponent,
    ListProduitComponent,
    ListCategorieComponent,
    VoirCategorieComponent,
    VoirProduitComponent,
    VoirDetteComponent,
    VoirVenteComponent,
    InventaireComponent,
    ParamettreComponent,
    HomeClientComponent,
    DetailProduitComponent,
    DetailCategorieComponent,
    ClistCategorieComponent,
    ClistProduitComponent,
    AfficheComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
