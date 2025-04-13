import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EredmenyService {
  private eredmenyek: any[] = [];

  getEredmenyek() {
    return this.eredmenyek;
  }

  addEredmeny(merkozes: any) {
    this.eredmenyek.push({
      hazai: merkozes.hazai,
      vendeg: merkozes.vendeg,
      hazaiGol: merkozes.hazaiGol,
      vendegGol: merkozes.vendegGol
    });
  }
}
