import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAdvsiorProfileComponent } from './educator-advsior-profile.component';

describe('EducatorAdvsiorProfileComponent', () => {
  let component: EducatorAdvsiorProfileComponent;
  let fixture: ComponentFixture<EducatorAdvsiorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorAdvsiorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorAdvsiorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
