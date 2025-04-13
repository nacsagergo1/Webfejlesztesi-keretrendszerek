import { Component, OnInit, OnDestroy, Renderer2  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamShortPipe } from '../../team-short.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TeamShortPipe, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedTheme: 'light' | 'dark' = 'light';

  teams = [
    { name: 'Alaves', img: 'images/alaves.png' },
    { name: 'Athletic Bilbao', img: 'images/bilbao.png' },
    { name: 'Atletico Madrid', img: 'images/atletico.png' },
    { name: 'FC Barcelona', img: 'images/barcelona.png' },
    { name: 'Celta Vigo', img: 'images/celta.png' },
    { name: 'Espanyol', img: 'images/espanyol.png' },
    { name: 'Getafe', img: 'images/getafe.png' },
    { name: 'Girona', img: 'images/girona.png' },
    { name: 'Las Palmas', img: 'images/laspalmas.png' },
    { name: 'Leganes', img: 'images/leganes.png' },
    { name: 'Mallorca', img: 'images/mallorca.png' },
    { name: 'Osasuna', img: 'images/osasuna.png' },
    { name: 'Rayo Vallecano', img: 'images/rayo.png' },
    { name: 'Real Betis', img: 'images/betis.png' },
    { name: 'Real Madrid', img: 'images/realmadrid.png' },
    { name: 'Real Sociedad', img: 'images/sociedad.png' },
    { name: 'Sevilla', img: 'images/sevilla.png' },
    { name: 'Valencia', img: 'images/valencia.png' },
    { name: 'Valladolid', img: 'images/valladolid.png' },
    { name: 'Villarreal', img: 'images/villarreal.png' }
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setBodyClass();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'light');
    this.renderer.removeClass(document.body, 'dark');
  }

  toggleTheme(): void {
    this.selectedTheme = this.selectedTheme === 'light' ? 'dark' : 'light';
    this.setBodyClass();
  }

  private setBodyClass(): void {
    const oppositeTheme = this.selectedTheme === 'light' ? 'dark' : 'light';
    this.renderer.removeClass(document.body, oppositeTheme);
    this.renderer.addClass(document.body, this.selectedTheme);
  }
}
