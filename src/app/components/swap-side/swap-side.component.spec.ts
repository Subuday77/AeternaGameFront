import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapSideComponent } from './swap-side.component';

describe('SwapSideComponent', () => {
  let component: SwapSideComponent;
  let fixture: ComponentFixture<SwapSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
