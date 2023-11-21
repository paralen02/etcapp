import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidoresComponent } from './repartidores.component';

describe('RepartidoresComponent', () => {
  let component: RepartidoresComponent;
  let fixture: ComponentFixture<RepartidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepartidoresComponent]
    });
    fixture = TestBed.createComponent(RepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
