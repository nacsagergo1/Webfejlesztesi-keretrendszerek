import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface Match {
  id: number;
  hazai: string;
  vendeg: string;
  hazaiGol: number | null;
  vendegGol: number | null;
  completed: boolean;
}

@Component({
  selector: 'app-merkozesek',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './merkozesek.component.html',
  styleUrls: ['./merkozesek.component.scss']
})
export class MerkozesekComponent {
  @Input() title: string = 'Mérkőzések hozzáadása';
  @Output() matchAdded = new EventEmitter<Match>();

teams: { name: string, img: string }[] = [
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


  newMatch = {
    hazai: '',
    vendeg: ''
  };

getTeamImg(teamName: string): string {
  const team = this.teams.find(t => t.name === teamName);
  return team ? team.img : 'images/default.png'; 
}

  matches: Match[] = [];

  displayedColumns: string[] = ['hazai', 'vendeg', 'hazaiGol', 'vendegGol', 'actions'];

  addMatch(): void {
    if (this.newMatch.hazai && this.newMatch.vendeg && this.newMatch.hazai !== this.newMatch.vendeg) {
      const newMatchEntry: Match = {
        id: this.matches.length + 1,
        hazai: this.newMatch.hazai,
        vendeg: this.newMatch.vendeg,
        hazaiGol: null,
        vendegGol: null,
        completed: false
      };
      this.matches = [...this.matches, newMatchEntry];
      this.matchAdded.emit(newMatchEntry);
      this.newMatch = { hazai: '', vendeg: '' };
    }
  }

  recordResult(match: Match): void {
    if (match.hazaiGol !== null && match.vendegGol !== null && match.hazaiGol >= 0 && match.vendegGol >= 0) {
      match.completed = true;
    }
  }

  get activeMatches() {
    return this.matches.filter(m => !m.completed);
  }
}
