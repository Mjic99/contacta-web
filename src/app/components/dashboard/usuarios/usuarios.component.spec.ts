import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';
import { AppModule } from 'src/app/app.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AngularFirestore],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
