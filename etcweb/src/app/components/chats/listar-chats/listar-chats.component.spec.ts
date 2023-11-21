import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarChatsComponent } from './listar-chats.component';

describe('ListarChatsComponent', () => {
  let component: ListarChatsComponent;
  let fixture: ComponentFixture<ListarChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarChatsComponent]
    });
    fixture = TestBed.createComponent(ListarChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
