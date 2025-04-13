import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface MatchResult {
  id: number;
  hazai: string;
  vendeg: string;
  hazaiGol: number;
  vendegGol: number;
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
    MatIconModule
  ],
  templateUrl: './eredmenyek.component.html',
  styleUrls: ['./eredmenyek.component.scss']
})
export class EredmenyekComponent {
  displayedColumns: string[] = ['hazai', 'hazaiGol', 'vendegGol', 'vendeg'];
  
  // Itt a már lezárt mérkőzések (eredmények) listája szerepel
  results: MatchResult[] = [];

  // Ezt a metódust fel lehet hívni pl. egy közös adatkezelés (pl. szolgáltatás) vagy eseménykezelés útján
  addResult(result: MatchResult): void {
    this.results = [...this.results, result];
  }
}
