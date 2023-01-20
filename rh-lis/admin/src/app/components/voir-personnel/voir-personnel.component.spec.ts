import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirPersonnelComponent } from './voir-personnel.component';

describe('VoirPersonnelComponent', () => {
  let component: VoirPersonnelComponent;
  let fixture: ComponentFixture<VoirPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
