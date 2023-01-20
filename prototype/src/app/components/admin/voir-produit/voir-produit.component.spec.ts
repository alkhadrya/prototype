import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirProduitComponent } from './voir-produit.component';

describe('VoirProduitComponent', () => {
  let component: VoirProduitComponent;
  let fixture: ComponentFixture<VoirProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
