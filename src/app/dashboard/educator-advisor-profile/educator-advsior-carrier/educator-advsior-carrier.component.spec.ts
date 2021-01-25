import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAdvsiorCarrierComponent } from './educator-advsior-carrier.component';

describe('EducatorAdvsiorCarrierComponent', () => {
  let component: EducatorAdvsiorCarrierComponent;
  let fixture: ComponentFixture<EducatorAdvsiorCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorAdvsiorCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorAdvsiorCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
