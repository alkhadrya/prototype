import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirVenteComponent } from './voir-vente.component';

describe('VoirVenteComponent', () => {
  let component: VoirVenteComponent;
  let fixture: ComponentFixture<VoirVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
