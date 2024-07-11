import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LerPage } from './ler.page';

describe('LerPage', () => {
  let component: LerPage;
  let fixture: ComponentFixture<LerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
