import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaEnviosComponent } from './creaedita-envios.component';

describe('CreaeditaEnviosComponent', () => {
  let component: CreaeditaEnviosComponent;
  let fixture: ComponentFixture<CreaeditaEnviosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaEnviosComponent]
    });
    fixture = TestBed.createComponent(CreaeditaEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
