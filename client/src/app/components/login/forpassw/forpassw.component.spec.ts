import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForpasswComponent } from './forpassw.component';

describe('ForpasswComponent', () => {
  let component: ForpasswComponent;
  let fixture: ComponentFixture<ForpasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForpasswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForpasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
