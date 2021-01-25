import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvsiorReferalSignupComponent } from './advsior-referal-signup.component';

describe('AdvsiorReferalSignupComponent', () => {
  let component: AdvsiorReferalSignupComponent;
  let fixture: ComponentFixture<AdvsiorReferalSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvsiorReferalSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvsiorReferalSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
