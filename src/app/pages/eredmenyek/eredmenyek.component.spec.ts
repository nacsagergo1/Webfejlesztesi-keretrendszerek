import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EredmenyekComponent } from './eredmenyek.component';

describe('EredmenyekComponent', () => {
  let component: EredmenyekComponent;
  let fixture: ComponentFixture<EredmenyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EredmenyekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EredmenyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
