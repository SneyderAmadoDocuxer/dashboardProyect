import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmingPoolComponent } from './swimming-pool.component';

describe('SwimmingPoolComponent', () => {
  let component: SwimmingPoolComponent;
  let fixture: ComponentFixture<SwimmingPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwimmingPoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwimmingPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
