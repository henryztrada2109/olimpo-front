import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMenuComponent } from './tipo-menu.component';

describe('TipoMenuComponent', () => {
  let component: TipoMenuComponent;
  let fixture: ComponentFixture<TipoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
