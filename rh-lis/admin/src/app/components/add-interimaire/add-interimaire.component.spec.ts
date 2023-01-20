import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterimaireComponent } from './add-interimaire.component';

describe('AddInterimaireComponent', () => {
  let component: AddInterimaireComponent;
  let fixture: ComponentFixture<AddInterimaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterimaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterimaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
