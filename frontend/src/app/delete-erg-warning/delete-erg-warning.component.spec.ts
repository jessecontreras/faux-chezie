import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteErgWarningComponent } from './delete-erg-warning.component';

describe('DeleteErgWarningComponent', () => {
  let component: DeleteErgWarningComponent;
  let fixture: ComponentFixture<DeleteErgWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteErgWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteErgWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
