import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificaoPage } from './notificao.page';

describe('NotificaoPage', () => {
  let component: NotificaoPage;
  let fixture: ComponentFixture<NotificaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
