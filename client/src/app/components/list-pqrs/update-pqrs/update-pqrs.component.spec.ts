import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePqrsComponent } from './update-pqrs.component';

describe('UpdatePqrsComponent', () => {
  let component: UpdatePqrsComponent;
  let fixture: ComponentFixture<UpdatePqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePqrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
