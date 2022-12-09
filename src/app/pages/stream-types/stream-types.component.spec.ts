import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamTypesComponent } from './stream-types.component';

describe('StreamTypesComponent', () => {
  let component: StreamTypesComponent;
  let fixture: ComponentFixture<StreamTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
