import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClistProduitComponent } from './clist-produit.component';

describe('ClistProduitComponent', () => {
  let component: ClistProduitComponent;
  let fixture: ComponentFixture<ClistProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClistProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClistProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
