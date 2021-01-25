import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorSettingsComponent } from './educator-settings.component';

describe('EducatorSettingsComponent', () => {
  let component: EducatorSettingsComponent;
  let fixture: ComponentFixture<EducatorSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
