import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDetteComponent } from './voir-dette.component';

describe('VoirDetteComponent', () => {
  let component: VoirDetteComponent;
  let fixture: ComponentFixture<VoirDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirDetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
