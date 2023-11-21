import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaProductosComponent } from './creaedita-productos.component';

describe('CreaeditaProductosComponent', () => {
  let component: CreaeditaProductosComponent;
  let fixture: ComponentFixture<CreaeditaProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaProductosComponent]
    });
    fixture = TestBed.createComponent(CreaeditaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
