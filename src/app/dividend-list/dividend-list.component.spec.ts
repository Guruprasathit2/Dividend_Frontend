import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendListComponent } from './dividend-list.component';

describe('DividendListComponent', () => {
  let component: DividendListComponent;
  let fixture: ComponentFixture<DividendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
