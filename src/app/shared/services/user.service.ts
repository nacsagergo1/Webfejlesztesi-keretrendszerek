import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  register(user: User): Observable<boolean> {
    console.log('Regisztráció elküldve a szerverre:', user);
    
    return of(true).pipe(
      delay(1500),
      tap(() => console.log('Sikeres regisztráció'))
    );
  }
}
