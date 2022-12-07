import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerSaveComponent } from './streamer-save.component';

describe('StreamerSaveComponent', () => {
  let component: StreamerSaveComponent;
  let fixture: ComponentFixture<StreamerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamerSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
