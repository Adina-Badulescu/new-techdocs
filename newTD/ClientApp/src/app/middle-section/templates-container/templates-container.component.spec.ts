import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesContainerComponent } from './templates-container.component';

describe('CardComponent', () => {
  let component: TemplatesContainerComponent;
  let fixture: ComponentFixture<TemplatesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
