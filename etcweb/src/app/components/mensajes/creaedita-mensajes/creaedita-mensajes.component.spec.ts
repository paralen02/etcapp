import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaMensajesComponent } from './creaedita-mensajes.component';

describe('CreaeditaMensajesComponent', () => {
  let component: CreaeditaMensajesComponent;
  let fixture: ComponentFixture<CreaeditaMensajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaMensajesComponent]
    });
    fixture = TestBed.createComponent(CreaeditaMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
