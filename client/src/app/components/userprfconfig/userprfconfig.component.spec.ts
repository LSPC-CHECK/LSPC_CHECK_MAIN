import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprfconfigComponent } from './userprfconfig.component';

describe('UserprfconfigComponent', () => {
  let component: UserprfconfigComponent;
  let fixture: ComponentFixture<UserprfconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprfconfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserprfconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
