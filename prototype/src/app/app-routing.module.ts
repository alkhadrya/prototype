import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AfficheComponent } from './components/admin/affiche/affiche.component';


const routes: Routes = [
  { path: '', redirectTo: 'affiche', pathMatch: 'full' },
  { path:"home_client",component:HomeClientComponent },
  { path:"home_admin",component:HomeAdminComponent },
  { path:"add-produit",component:AddProduitComponent }, 
  { path:"add-vente",component:AddVenteComponent },
  { path:"add-dette",component:AddDetteComponent },
  { path:"add-categorie",component:AddCategorieComponent },
  { path:"list-produit",component:ListProduitComponent },
  { path:"list-categorie",component:ListCategorieComponent },
  { path:"list-vente",component:ListVenteComponent },
  { path:"list-dette",component:ListDetteComponent },
  { path:"inventaire",component:InventaireComponent },
  { path:"parametre",component:ParamettreComponent },
  { path:"clist-categorie",component:ClistCategorieComponent },
  { path:"clist-produit",component:ClistProduitComponent },
  { path:"affiche",component:AfficheComponent },


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
