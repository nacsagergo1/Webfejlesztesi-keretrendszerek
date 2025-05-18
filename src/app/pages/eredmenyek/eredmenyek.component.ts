import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatchService } from '../../shared/services/match.service';
import { Match } from '../../shared/services/match.service';
import { MatListModule } from '@angular/material/list';

export interface Team {
  name: string;
  img: string;
}

@Component({
  selector: 'app-eredmenyek',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './eredmenyek.component.html',
  styleUrls: ['./eredmenyek.component.scss']
})
export class EredmenyekComponent implements OnInit {
  displayedColumns: string[] = ['hazai', 'hazaiGol', 'vendegGol', 'vendeg', 'actions'];
  results: Match[] = [];

  teams: Team[] = [
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
    this.loadExtraQueries();
  }

  loadMatches(): void {
    this.matchService.getMatches().subscribe(
      (matches: Match[]) => {
        this.results = matches;
      },
      (err) => {
        console.error('Hiba a mérkőzések betöltésekor:', err);
      }
    );
  }

  getTeamImg(teamName: string): string {
    const team = this.teams.find(t => t.name === teamName);
    return team ? team.img : 'images/default.png'; 
  }

  deleteMatch(matchId: string): void {
    this.matchService.deleteMatch(matchId).then(() => {
      this.results = this.results.filter(match => match.id !== matchId);
      console.log('Mérkőzés törölve:', matchId);
    }).catch(err => {
      console.error('Hiba a mérkőzés törlésénél:', err);
    });
  }

  topScoredMatches: Match[] = [];
  realMadridMatches: Match[] = [];
  barcelonaMatches: Match[] = [];
  highScoringMatches: Match[] = [];

  loadExtraQueries() {
    this.matchService.getMostScoredMatches().subscribe(data => this.topScoredMatches = data);
    this.matchService.getMatchesByTeam('Real Madrid').subscribe(data => this.realMadridMatches = data);
    this.matchService.getMatchesAgainstTeam('FC Barcelona').subscribe(data => this.barcelonaMatches = data);
    this.matchService.getHighScoringMatches().subscribe(data => this.highScoringMatches = data);
  }

}
