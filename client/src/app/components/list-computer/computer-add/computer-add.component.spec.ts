import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerAddComponent } from './computer-add.component';

describe('ComputerAddComponent', () => {
  let component: ComputerAddComponent;
  let fixture: ComponentFixture<ComputerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
