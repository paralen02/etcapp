import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaOperacionesComponent } from './creaedita-operaciones.component';

describe('CreaeditaOperacionesComponent', () => {
  let component: CreaeditaOperacionesComponent;
  let fixture: ComponentFixture<CreaeditaOperacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaOperacionesComponent]
    });
    fixture = TestBed.createComponent(CreaeditaOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
