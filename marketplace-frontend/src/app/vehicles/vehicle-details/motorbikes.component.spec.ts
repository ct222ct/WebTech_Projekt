import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorbikesComponent } from '../motorbikes/motorbikes.component';

describe('MotorbikesComponent', () => {
  let component: MotorbikesComponent;
  let fixture: ComponentFixture<MotorbikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorbikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorbikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
