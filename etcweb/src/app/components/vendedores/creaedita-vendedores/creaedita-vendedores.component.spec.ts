import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaVendedoresComponent } from './creaedita-vendedores.component';

describe('CreaeditaVendedoresComponent', () => {
  let component: CreaeditaVendedoresComponent;
  let fixture: ComponentFixture<CreaeditaVendedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaVendedoresComponent]
    });
    fixture = TestBed.createComponent(CreaeditaVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
