import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerlistaComponent } from './playerlista.component';

describe('PlayerlistaComponent', () => {
  let component: PlayerlistaComponent;
  let fixture: ComponentFixture<PlayerlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerlistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
