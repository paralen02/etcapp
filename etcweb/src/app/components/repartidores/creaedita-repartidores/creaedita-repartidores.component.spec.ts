import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaRepartidoresComponent } from './creaedita-repartidores.component';

describe('CreaeditaRepartidoresComponent', () => {
  let component: CreaeditaRepartidoresComponent;
  let fixture: ComponentFixture<CreaeditaRepartidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaRepartidoresComponent]
    });
    fixture = TestBed.createComponent(CreaeditaRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
