import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComputerComponent } from './list-computer.component';

describe('ListComputerComponent', () => {
  let component: ListComputerComponent;
  let fixture: ComponentFixture<ListComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComputerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
