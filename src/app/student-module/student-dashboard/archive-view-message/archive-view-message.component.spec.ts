import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveViewMessageComponent } from './archive-view-message.component';

describe('ArchiveViewMessageComponent', () => {
  let component: ArchiveViewMessageComponent;
  let fixture: ComponentFixture<ArchiveViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
