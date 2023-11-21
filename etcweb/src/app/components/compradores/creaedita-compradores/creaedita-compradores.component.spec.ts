import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaCompradoresComponent } from './creaedita-compradores.component';

describe('CreaeditaCompradoresComponent', () => {
  let component: CreaeditaCompradoresComponent;
  let fixture: ComponentFixture<CreaeditaCompradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaCompradoresComponent]
    });
    fixture = TestBed.createComponent(CreaeditaCompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
