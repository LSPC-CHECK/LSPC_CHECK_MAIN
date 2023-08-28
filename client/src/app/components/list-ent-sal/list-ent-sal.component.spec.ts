import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntSalComponent } from './list-ent-sal.component';

describe('ListEntSalComponent', () => {
  let component: ListEntSalComponent;
  let fixture: ComponentFixture<ListEntSalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntSalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEntSalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
