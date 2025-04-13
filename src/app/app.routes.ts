import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { EredmenyekComponent } from './pages/eredmenyek/eredmenyek.component';
import { MerkozesekComponent } from './pages/merkozesek/merkozesek.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'tabella', component: TabellaComponent},
    { path: 'eredmenyek', component: EredmenyekComponent},
    { path: 'merkozesek', component: MerkozesekComponent},

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: HomeComponent}
];
