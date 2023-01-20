import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirInterimaireComponent } from './voir-interimaire.component';

describe('VoirInterimaireComponent', () => {
  let component: VoirInterimaireComponent;
  let fixture: ComponentFixture<VoirInterimaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirInterimaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirInterimaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
