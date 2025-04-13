import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { HomeComponent } from '\../../pages/home/home.component';
import { TabellaComponent } from '\../../pages/tabella/tabella.component';
import { EredmenyekComponent } from '\../../pages/eredmenyek/eredmenyek.component';
import { MerkozesekComponent } from '\../../pages/merkozesek/merkozesek.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, HomeComponent, TabellaComponent, EredmenyekComponent, MerkozesekComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() sidenav!: MatSidenav;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  currentPage: string = 'home';

  constructor() {
    console.log("constructor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.currentPage = pageValue;
    this.selectedPage.emit(pageValue);

    this.sidenav.close();
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}