import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AppModule } from 'src/app/app.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

class AdminServiceMock extends AdminService {
  addDescuento (descuento: Object) : Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve("Descuento added")
      }, 250)
    });
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let adminService : AdminService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        MatSnackBarModule
      ],
      providers: [
        DashboardComponent,
        AngularFirestore,
        Renderer2,
        MatSnackBarModule,
        MatSnackBar,
        { provide: AdminService, useClass: AdminServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    /* fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); */
    component = TestBed.get(DashboardComponent)
    adminService = TestBed.get(AdminService)
  });

  it('should open snackbar', () => {
    /* spyOn(component, 'crearDescuento')
    let button = fixture.debugElement.nativeElement.querySelector('button')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.crearDescuento).toHaveBeenCalledTimes(0)
    }) */
    component.ngOnInit()
    component.dctoMonto = 20
    component.dctoTipo = 'SOLES'
    component.dctoDesde = new Date()
    component.dctoHasta = new Date()
    component.dctoClave = 'waswas'
    //let button = fixture.debugElement.nativeElement.querySelector('button')
    //console.log(button)
    //button.click()
    component.crearDescuento()
    fixture.whenStable().then(() => {
      expect(component.dctoClave).toBe(null)
    })
  });
});
