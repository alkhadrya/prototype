import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetteComponent } from './list-dette.component';

describe('ListDetteComponent', () => {
  let component: ListDetteComponent;
  let fixture: ComponentFixture<ListDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
