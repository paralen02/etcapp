import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaChatsComponent } from './creaedita-chats.component';

describe('CreaeditaChatsComponent', () => {
  let component: CreaeditaChatsComponent;
  let fixture: ComponentFixture<CreaeditaChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaChatsComponent]
    });
    fixture = TestBed.createComponent(CreaeditaChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
