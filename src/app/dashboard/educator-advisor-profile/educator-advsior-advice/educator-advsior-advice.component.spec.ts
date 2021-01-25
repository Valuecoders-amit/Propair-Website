import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAdvsiorAdviceComponent } from './educator-advsior-advice.component';

describe('EducatorAdvsiorAdviceComponent', () => {
  let component: EducatorAdvsiorAdviceComponent;
  let fixture: ComponentFixture<EducatorAdvsiorAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorAdvsiorAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorAdvsiorAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
