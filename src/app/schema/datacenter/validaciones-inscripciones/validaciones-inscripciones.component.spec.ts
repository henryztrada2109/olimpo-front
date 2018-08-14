import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionesInscripcionesComponent } from './validaciones-inscripciones.component';

describe('ValidacionesInscripcionesComponent', () => {
  let component: ValidacionesInscripcionesComponent;
  let fixture: ComponentFixture<ValidacionesInscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionesInscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionesInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
