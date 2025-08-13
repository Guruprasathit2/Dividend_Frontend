import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendMSTRComponent } from './dividend-mstr.component';

describe('DividendMSTRComponent', () => {
  let component: DividendMSTRComponent;
  let fixture: ComponentFixture<DividendMSTRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendMSTRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendMSTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
