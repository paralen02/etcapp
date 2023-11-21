import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaPagosComponent } from './creaedita-pagos.component';

describe('CreaeditaPagosComponent', () => {
  let component: CreaeditaPagosComponent;
  let fixture: ComponentFixture<CreaeditaPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaPagosComponent]
    });
    fixture = TestBed.createComponent(CreaeditaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
