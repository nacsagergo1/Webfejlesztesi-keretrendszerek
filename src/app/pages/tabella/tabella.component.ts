import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

export interface MatchResult {
  hazai: string;
  vendeg: string;
  hazaiGol: number;
  vendegGol: number;
}

export interface TeamStats {
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  goalDifference: number;
  points: number;
}

@Component({
  selector: 'app-tabella',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.scss']
})
export class TabellaComponent implements OnChanges {
  @Input() results: MatchResult[] = [];

  teamStats: TeamStats[] = [];
  displayedColumns: string[] = ['position', 'team', 'played', 'wins', 'draws', 'losses', 'gf', 'ga', 'goalDifference', 'points'];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['results']) {
      this.calculateStandings();
    }
  }

  calculateStandings(): void {
    const statsMap = new Map<string, TeamStats>();

    this.results.forEach(result => {
      // Frissítjük a hazai csapat statisztikáit
      this.updateTeam(statsMap, result.hazai, result.hazaiGol, result.vendegGol);
      // Frissítjük a vendég csapat statisztikáit
      this.updateTeam(statsMap, result.vendeg, result.vendegGol, result.hazaiGol);
    });

    // Átalakítjuk a map-et tömbbé
    this.teamStats = Array.from(statsMap.values());

    // Rendezés: először pontszám (csökkenő), majd gólkülönbség (csökkenő), végül abc sorrend (növekvő)
    this.teamStats.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      } else {
        return a.team.localeCompare(b.team);
      }
    });
  }

  updateTeam(statsMap: Map<string, TeamStats>, team: string, goalsFor: number, goalsAgainst: number): void {
    let teamStat = statsMap.get(team);
    if (!teamStat) {
      teamStat = {
        team: team,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        ga: 0,
        goalDifference: 0,
        points: 0
      };
      statsMap.set(team, teamStat);
    }

    teamStat.played++;
    teamStat.gf += goalsFor;
    teamStat.ga += goalsAgainst;
    teamStat.goalDifference = teamStat.gf - teamStat.ga;

    if (goalsFor > goalsAgainst) {
      teamStat.wins++;
      teamStat.points += 3;
    } else if (goalsFor === goalsAgainst) {
      teamStat.draws++;
      teamStat.points += 1;
    } else {
      teamStat.losses++;
    }
  }
}
