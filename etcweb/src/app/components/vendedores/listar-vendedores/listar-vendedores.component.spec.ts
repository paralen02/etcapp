import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendedoresComponent } from './listar-vendedores.component';

describe('ListarVendedoresComponent', () => {
  let component: ListarVendedoresComponent;
  let fixture: ComponentFixture<ListarVendedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVendedoresComponent]
    });
    fixture = TestBed.createComponent(ListarVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
