import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'postes', component: ListPosteComponent },
  { path: 'produits', component: ListProduitComponent },
  { path: 'ventes', component: ListVenteComponent },
  { path: 'produit', component: VoirProduitComponent },
  { path: 'poste', component: VoirPosteComponent },
  { path: 'add-produit', component: AddProduitComponent },
  { path: 'add-poste', component: AddPosteComponent },
  { path: 'vente', component: VenteComponent },
  { path: 'inventaire', component: InventaireComponent },
  // { path: 'historique', component: HistoriqueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
