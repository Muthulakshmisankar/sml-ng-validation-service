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
  slicedArray: Array<any> = [];
  selectedRegex: any;
  regexPatternsArray: Array<any> = [
    { 'value': 'Alpha', 'label': 'Enter Alphabet only' },
    { 'value': 'Number', 'label': 'Enter Number only' },
    { 'value': 'SpecialChar', 'label': 'Enter special character only' },
    { 'value': 'anythingExceptSpace', 'label': 'Enter any characters except space' },
    { 'value': 'anythingExceptNumber', 'label': 'Enter anything except number' },
    { 'value': 'anythingExceptSpecialChar', 'label': 'Enter anything except special character' },
    { 'value': 'AlphaWithSpace', 'label': 'Enter Alphabet with space' },
    { 'value': 'onlySpace', 'label': 'Enter space only' }]
  constructor(
    private fb: FormBuilder,
    public validation: SmlNgValidationService
  ) { }
  get smlNgValidationFormControls(): any {
    return this.smlNgValidationForm.controls;
  }
  ngOnInit() {
    this.smlNgValidationForm = this.fb.group({
      stringWithSpace: ['', Validators.required],
      regexDefined: ['', [Validators.required]],
      StrregexDefined: ['', [Validators.required]],
      lengthDefined: ['', [Validators.required, this.validation.MinMax('Integer', 2, 2)]],
      email: ['', [Validators.required, this.validation.EmailId()]],
      telephone: ['', [Validators.required, this.validation.PhoneNumber()]],
      sliceNthElement: ['']
    });
  }
  sliceArrayItems(event) {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    let slicedObj: any = this.validation.sliceNthElementsFromArray(arr, this.smlNgValidationFormControls.sliceNthElement.value, '3');
    console.log('returned', slicedObj)
    this.slicedArray = slicedObj.Error ? slicedObj.Error : slicedObj.slicedItems;
  }
  setRegex() {
   this.smlNgValidationFormControls.stringWithSpace.setValue('');
  }
}
