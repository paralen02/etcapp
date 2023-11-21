import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaRoleComponent } from './creaedita-role.component';

describe('CreaeditaRoleComponent', () => {
  let component: CreaeditaRoleComponent;
  let fixture: ComponentFixture<CreaeditaRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaRoleComponent]
    });
    fixture = TestBed.createComponent(CreaeditaRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
