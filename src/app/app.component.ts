import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SmlNgValidationService } from 'projects/sml-ng-validation-service/src/public-api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sml-validation-service';
  smlNgValidationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public validation: SmlNgValidationService
  ) { }
  get smlNgValidationFormControls():any{
    return this.smlNgValidationForm.controls;
  }
  ngOnInit(){
    this.smlNgValidationForm = this.fb.group({
      name: ['',Validators.required],
      telephone: ['',Validators.required],
      email: ['',Validators.required],
      address: ['',Validators.required]
    });
  }
}
