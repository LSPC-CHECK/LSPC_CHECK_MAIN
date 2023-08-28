import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcheckComponent } from './qrcheck.component';

describe('QrcheckComponentComponent', () => {
  let component: QrcheckComponent;
  let fixture: ComponentFixture<QrcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
