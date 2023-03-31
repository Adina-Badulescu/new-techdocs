import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemplatesComponent } from './admin-templates.component';

describe('CreateTemplateComponent', () => {
  let component: AdminTemplatesComponent;
  let fixture: ComponentFixture<AdminTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
