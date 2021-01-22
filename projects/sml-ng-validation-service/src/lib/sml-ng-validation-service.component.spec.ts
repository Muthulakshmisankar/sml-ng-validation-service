import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmlNgValidationServiceComponent } from './sml-ng-validation-service.component';

describe('SmlNgValidationServiceComponent', () => {
  let component: SmlNgValidationServiceComponent;
  let fixture: ComponentFixture<SmlNgValidationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmlNgValidationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmlNgValidationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
