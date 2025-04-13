import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkozesekComponent } from './merkozesek.component';

describe('MerkozesekComponent', () => {
  let component: MerkozesekComponent;
  let fixture: ComponentFixture<MerkozesekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerkozesekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkozesekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
