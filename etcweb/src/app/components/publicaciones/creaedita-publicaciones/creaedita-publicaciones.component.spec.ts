import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaPublicacionesComponent } from './creaedita-publicaciones.component';

describe('CreaeditaPublicacionesComponent', () => {
  let component: CreaeditaPublicacionesComponent;
  let fixture: ComponentFixture<CreaeditaPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaPublicacionesComponent]
    });
    fixture = TestBed.createComponent(CreaeditaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
