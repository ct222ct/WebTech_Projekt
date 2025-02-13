import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerListingsComponent } from './buyer-listings.component';

describe('BuyerListingsComponent', () => {
  let component: BuyerListingsComponent;
  let fixture: ComponentFixture<BuyerListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
