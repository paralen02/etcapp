import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEnviosComponent } from './listar-envios.component';

describe('ListarEnviosComponent', () => {
  let component: ListarEnviosComponent;
  let fixture: ComponentFixture<ListarEnviosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEnviosComponent]
    });
    fixture = TestBed.createComponent(ListarEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
