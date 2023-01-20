import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClistCategorieComponent } from './clist-categorie.component';

describe('ClistCategorieComponent', () => {
  let component: ClistCategorieComponent;
  let fixture: ComponentFixture<ClistCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClistCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClistCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
