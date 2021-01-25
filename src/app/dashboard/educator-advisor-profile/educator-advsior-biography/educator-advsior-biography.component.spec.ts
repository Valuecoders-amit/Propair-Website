import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAdvsiorBiographyComponent } from './educator-advsior-biography.component';

describe('EducatorAdvsiorBiographyComponent', () => {
  let component: EducatorAdvsiorBiographyComponent;
  let fixture: ComponentFixture<EducatorAdvsiorBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorAdvsiorBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorAdvsiorBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
