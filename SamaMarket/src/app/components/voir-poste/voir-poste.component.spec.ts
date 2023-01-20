import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirPosteComponent } from './voir-poste.component';

describe('VoirPosteComponent', () => {
  let component: VoirPosteComponent;
  let fixture: ComponentFixture<VoirPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
