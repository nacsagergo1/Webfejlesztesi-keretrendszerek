import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "webkeretfocibajnoksag", appId: "1:32322202354:web:bf75e000fe6cb1cc903e6b", storageBucket: "webkeretfocibajnoksag.firebasestorage.app", apiKey: "AIzaSyAPeE5Oqnuoljv_7O-ZkPbDlzJsa5dE3eY", authDomain: "webkeretfocibajnoksag.firebaseapp.com", messagingSenderId: "32322202354" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
