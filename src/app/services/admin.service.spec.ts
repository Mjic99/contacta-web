import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { AppModule } from '../app.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [AppModule],
    providers: [AngularFirestore],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
