import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'entreprises', component: ListEntrepriseComponent },
  { path: 'personnels', component: ListPersonnelComponent },
  { path: 'interimaires', component: ListInterimaireComponent },
  { path: 'personnel', component: VoirPersonnelComponent },
  { path: 'entreprise', component: VoirEntrepriseComponent },
  { path: 'add-personnel', component: AddPersonnelComponent },
  { path: 'add-entreprise', component: AddEntrepriseComponent },
  { path: 'add-interimaire', component: AddInterimaireComponent },
  { path: 'pointage', component: PointageComponent },
  { path: 'cartes', component: CartesComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'absence', component: AbsencesComponent },
  { path: 'moi', component: VoitPersonnelComponent },
  { path: 'contrat', component: ContratComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
