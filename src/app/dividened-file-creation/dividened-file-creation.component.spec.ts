import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividenedFileCreationComponent } from './dividened-file-creation.component';

describe('DividenedFileCreationComponent', () => {
  let component: DividenedFileCreationComponent;
  let fixture: ComponentFixture<DividenedFileCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividenedFileCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividenedFileCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
