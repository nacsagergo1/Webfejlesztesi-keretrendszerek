import { Component, OnInit } from '@angular/core';
import { MatchService, Match } from '../../shared/services/match.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Team {
  name: string;
  points: number;
  img: string;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  matchesPlayed: number;
}

@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule]
})
export class TabellaComponent implements OnInit {
  teams: Team[] = [];

  displayedColumns: string[] = ['position', 'team', 'matchesPlayed', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points'];

  knownTeams: { name: string, img: string }[] = [
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

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.matchService.getMatches().subscribe(
      (matches: Match[]) => this.calculatePoints(matches),
      (err) => console.error('Hiba a mérkőzések betöltésekor:', err)
    );
  }

  calculatePoints(matches: Match[]): void {
    const teamsMap: { [key: string]: Team } = {};

    matches.forEach(match => {
      const hazai = match.hazai;
      const vendeg = match.vendeg;
      const hazaiGol = match.hazaiGol ?? 0;
      const vendegGol = match.vendegGol ?? 0;

      // Inicializálás, ha még nincs a map-ben
      if (!teamsMap[hazai]) {
        teamsMap[hazai] = {
          name: hazai,
          points: 0,
          img: this.getTeamImg(hazai),
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          matchesPlayed: 0
        };
      }

      if (!teamsMap[vendeg]) {
        teamsMap[vendeg] = {
          name: vendeg,
          points: 0,
          img: this.getTeamImg(vendeg),
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          matchesPlayed: 0
        };
      }

      // Meccsszám növelés
      teamsMap[hazai].matchesPlayed += 1;
      teamsMap[vendeg].matchesPlayed += 1;

      // Pontok
      if (hazaiGol > vendegGol) {
        teamsMap[hazai].points += 3;
      } else if (hazaiGol < vendegGol) {
        teamsMap[vendeg].points += 3;
      } else {
        teamsMap[hazai].points += 1;
        teamsMap[vendeg].points += 1;
      }

      // Gólszámok frissítése
      teamsMap[hazai].goalsFor += hazaiGol;
      teamsMap[hazai].goalsAgainst += vendegGol;

      teamsMap[vendeg].goalsFor += vendegGol;
      teamsMap[vendeg].goalsAgainst += hazaiGol;
    });

    // Gólkülönbség kiszámítása
    Object.values(teamsMap).forEach(team => {
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    });

    // Rendezés
    this.teams = Object.values(teamsMap).sort((a, b) => {
      if (b.points === a.points) {
        return b.goalDifference - a.goalDifference;
      }
      return b.points - a.points;
    });
  }

  getTeamImg(teamName: string): string {
    const team = this.knownTeams.find(t => t.name === teamName);
    return team ? team.img : 'images/default.png';
  }
}