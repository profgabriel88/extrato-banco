import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoTableComponent } from './extrato-table.component';

describe('ExtratoTableComponent', () => {
  let component: ExtratoTableComponent;
  let fixture: ComponentFixture<ExtratoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtratoTableComponent]
    });
    fixture = TestBed.createComponent(ExtratoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
