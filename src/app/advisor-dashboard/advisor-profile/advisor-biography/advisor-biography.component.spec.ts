import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorBiographyComponent } from './advisor-biography.component';

describe('AdvisorBiographyComponent', () => {
  let component: AdvisorBiographyComponent;
  let fixture: ComponentFixture<AdvisorBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
