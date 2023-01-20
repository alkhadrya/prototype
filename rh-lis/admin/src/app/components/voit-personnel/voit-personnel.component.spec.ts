import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitPersonnelComponent } from './voit-personnel.component';

describe('VoitPersonnelComponent', () => {
  let component: VoitPersonnelComponent;
  let fixture: ComponentFixture<VoitPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
