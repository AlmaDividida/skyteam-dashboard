import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamTypeSaveComponent } from './stream-types-save.component';

describe('StreamTypeSaveComponent', () => {
  let component: StreamTypeSaveComponent;
  let fixture: ComponentFixture<StreamTypeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamTypeSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTypeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
