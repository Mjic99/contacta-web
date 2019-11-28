import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AppModule } from 'src/app/app.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        AngularFirestore,
        { provide: AdminService, useClass: AdminServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open snackbar', async(() => {
    /* spyOn(component, 'crearDescuento')
    let button = fixture.debugElement.nativeElement.querySelector('button')
    button.click()
    fixture.whenStable().then(() => {
      expect(component.crearDescuento).toHaveBeenCalledTimes(0)
    }) 
    component.dctoMonto = 20
    component.dctoTipo = 'SOLES'
    component.dctoDesde = new Date()
    component.dctoHasta = new Date()
    component.dctoClave = 'waswas'
    let button = fixture.debugElement.nativeElement.querySelector('button')
    console.log(button)
    //button.click()
    component.crearDescuento()
    fixture.whenStable().then(() => {
      expect(component.dctoClave).toBe(null)
    })*/
  }));
});
