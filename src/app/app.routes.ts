import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { EredmenyekComponent } from './pages/eredmenyek/eredmenyek.component';
import { MerkozesekComponent } from './pages/merkozesek/merkozesek.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'tabella', component: TabellaComponent},
    { path: 'eredmenyek', component: EredmenyekComponent},
    { path: 'merkozesek', component: MerkozesekComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent, canActivate: [publicGuard]},
    { path: 'signup', component: SignupComponent, canActivate: [publicGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: HomeComponent}
];
