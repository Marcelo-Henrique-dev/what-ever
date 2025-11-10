import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsConfigComponent } from './questions-config.component';

describe('QuestionsConfigComponent', () => {
  let component: QuestionsConfigComponent;
  let fixture: ComponentFixture<QuestionsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
