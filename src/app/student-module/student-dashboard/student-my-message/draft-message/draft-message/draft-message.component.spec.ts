import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMessageComponent } from './draft-message.component';

describe('DraftMessageComponent', () => {
  let component: DraftMessageComponent;
  let fixture: ComponentFixture<DraftMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
