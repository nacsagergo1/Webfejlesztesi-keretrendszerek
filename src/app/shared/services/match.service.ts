import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, updateDoc } from 'firebase/firestore';
import { query, where, orderBy, limit } from '@angular/fire/firestore';

export interface Match {
  id?: string;
  hazai: string;
  vendeg: string;
  hazaiGol: number | null;
  vendegGol: number | null;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private firestore: Firestore) {}

  addMatch(match: Match) {
    const matchesRef = collection(this.firestore, 'Matches');
    return addDoc(matchesRef, {
      ...match,
      createdAt: new Date()
    });
  }


  getMatches(): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'Matches');
    return collectionData(matchesRef, { idField: 'id' }) as Observable<Match[]>;
  }

  updateMatchResult(match: Match): Promise<void> {
    const matchRef = doc(this.firestore, `Matches/${match.id}`);
    return updateDoc(matchRef, {
      hazaiGol: match.hazaiGol,
      vendegGol: match.vendegGol,
      completed: match.completed
    });
  }

  async deleteMatch(matchId: string): Promise<void> {
    const matchDocRef = doc(this.firestore, 'Matches', matchId);
    await deleteDoc(matchDocRef);
  }

  getMostScoredMatches(): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'Matches');
    const q = query(matchesRef, orderBy('hazaiGol', 'desc'), limit(5));
    return collectionData(q, { idField: 'id' }) as Observable<Match[]>;
  }

  getMatchesByTeam(team: string): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'Matches');
    const q = query(matchesRef, where('hazai', '==', team));
    return collectionData(q, { idField: 'id' }) as Observable<Match[]>;
  }

  getMatchesAgainstTeam(team: string): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'Matches');
    const q = query(matchesRef, where('vendeg', '==', team));
    return collectionData(q, { idField: 'id' }) as Observable<Match[]>;
  }

  getHighScoringMatches(): Observable<Match[]> {
    const matchesRef = collection(this.firestore, 'Matches');
    const q = query(matchesRef, where('hazaiGol', '>=', 3));
    return collectionData(q, { idField: 'id' }) as Observable<Match[]>;
  }


}
