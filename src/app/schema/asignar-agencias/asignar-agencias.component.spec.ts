import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAgenciasComponent } from './asignar-agencias.component';

describe('AsignarAgenciasComponent', () => {
  let component: AsignarAgenciasComponent;
  let fixture: ComponentFixture<AsignarAgenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAgenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
