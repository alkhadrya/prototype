import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirEntrepriseComponent } from './voir-entreprise.component';

describe('VoirEntrepriseComponent', () => {
  let component: VoirEntrepriseComponent;
  let fixture: ComponentFixture<VoirEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
