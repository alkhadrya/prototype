import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirCategorieComponent } from './voir-categorie.component';

describe('VoirCategorieComponent', () => {
  let component: VoirCategorieComponent;
  let fixture: ComponentFixture<VoirCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
