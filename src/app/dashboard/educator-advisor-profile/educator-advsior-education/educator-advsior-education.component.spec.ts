import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAdvsiorEducationComponent } from './educator-advsior-education.component';

describe('EducatorAdvsiorEducationComponent', () => {
  let component: EducatorAdvsiorEducationComponent;
  let fixture: ComponentFixture<EducatorAdvsiorEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorAdvsiorEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorAdvsiorEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
