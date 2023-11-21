import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRepartidoresComponent } from './listar-repartidores.component';

describe('ListarRepartidoresComponent', () => {
  let component: ListarRepartidoresComponent;
  let fixture: ComponentFixture<ListarRepartidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarRepartidoresComponent]
    });
    fixture = TestBed.createComponent(ListarRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
