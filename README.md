# validation 
angular validation service
--------------------------------

Overview
--------
A simple way to validate user input from the UI and display useful validation message , in both reactive forms and DOM Events.

Validations in sml-ng-validation-service
----------------------------------------
1.EmailId Validations 

2.PhoneNumber Validations 

3.PhoneNumber Masking 

4.Min length & Max length 

5.User Defined Regex - For example, we need to allow only 1 to 5 digit only in the input box, other digits should not allow to type. So we have to use this userDefinedRegex.
	Example : validation.userDefinedRegex($event,'1','5', true); 

6.notAllowedMaxLength - This method doesn't allowed to enter text not more than the defined length. 


----------------------------------------

Installation
------------

step1: npm i sml-ng-validation-service --save

_____________________________________________________
Step2: Import SmlNgValidationService into your app module


import {  SmlNgValidationServiceModule } from 'sml-ng-validation-service';


@NgModule({
  declarations: [

    AppComponent,
    SmlNgValidationServiceModule

  ],
  imports: [

    BrowserModule

  ],
  providers: [],

  bootstrap: [ AppComponent ]

})

export class AppModule { }

_____________________________________________________
step3: Import SmlNgValidationService into your component.ts


import { SmlNgValidationService } from 'sml-ng-validation-service';

constructor(
    private fb: FormBuilder,
    public validation: SmlNgValidationService
  ) { }
  
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
______________________________________________________

DEMO:
---------
You can download and run it from your local.

github url : https://github.com/Muthulakshmisankar/sml-ng-validation-service/tree/master

_______________________________________________________________________________________

