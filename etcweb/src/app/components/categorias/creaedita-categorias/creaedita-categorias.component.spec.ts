import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaCategoriasComponent } from './creaedita-categorias.component';

describe('CreaeditaCategoriasComponent', () => {
  let component: CreaeditaCategoriasComponent;
  let fixture: ComponentFixture<CreaeditaCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaCategoriasComponent]
    });
    fixture = TestBed.createComponent(CreaeditaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
