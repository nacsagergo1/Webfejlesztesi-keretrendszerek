import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { EredmenyekComponent } from './pages/eredmenyek/eredmenyek.component';
import { MerkozesekComponent } from './pages/merkozesek/merkozesek.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HomeComponent,
    TabellaComponent,
    EredmenyekComponent,
    MerkozesekComponent,
    MenuComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  // A property neve: styleUrls, nem styleUrl
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'focibajnoksag';

  page = "home";

  changePage(selectedPage: string) {
    this.page = selectedPage;
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
