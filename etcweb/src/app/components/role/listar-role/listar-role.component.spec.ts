import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRoleComponent } from './listar-role.component';

describe('ListarRoleComponent', () => {
  let component: ListarRoleComponent;
  let fixture: ComponentFixture<ListarRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarRoleComponent]
    });
    fixture = TestBed.createComponent(ListarRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
