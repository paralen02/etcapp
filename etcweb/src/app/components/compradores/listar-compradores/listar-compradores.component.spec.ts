import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCompradoresComponent } from './listar-compradores.component';

describe('ListarCompradoresComponent', () => {
  let component: ListarCompradoresComponent;
  let fixture: ComponentFixture<ListarCompradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarCompradoresComponent]
    });
    fixture = TestBed.createComponent(ListarCompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
