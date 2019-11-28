import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AppModule } from '../app.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [AngularFirestore],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
