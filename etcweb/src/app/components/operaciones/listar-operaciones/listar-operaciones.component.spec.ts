import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOperacionesComponent } from './listar-operaciones.component';

describe('ListarOperacionesComponent', () => {
  let component: ListarOperacionesComponent;
  let fixture: ComponentFixture<ListarOperacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarOperacionesComponent]
    });
    fixture = TestBed.createComponent(ListarOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
