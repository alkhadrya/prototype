import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterimaireComponent } from './list-interimaire.component';

describe('ListInterimaireComponent', () => {
  let component: ListInterimaireComponent;
  let fixture: ComponentFixture<ListInterimaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterimaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInterimaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
