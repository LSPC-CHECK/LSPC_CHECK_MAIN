import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserprofileComponent } from './updateuserprofile.component';

describe('UpdateuserprofileComponent', () => {
  let component: UpdateuserprofileComponent;
  let fixture: ComponentFixture<UpdateuserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateuserprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
