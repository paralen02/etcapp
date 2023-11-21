import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaComprasComponent } from './creaedita-compras.component';

describe('CreaeditaComprasComponent', () => {
  let component: CreaeditaComprasComponent;
  let fixture: ComponentFixture<CreaeditaComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaComprasComponent]
    });
    fixture = TestBed.createComponent(CreaeditaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
