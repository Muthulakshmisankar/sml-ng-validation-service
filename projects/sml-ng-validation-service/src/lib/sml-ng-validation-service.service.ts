import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SmlNgValidationService {

  constructor() { }

  public regexMapping = {
    Alpha: /[a-zA-Z]/,
    Number: /[0-9]/,
    SpecialChar: /[\W]/,
    anythingExceptSpace: /[\S]/,
    anythingExceptNumber: /[\D]/,
    anythingExceptSpecialChar: /[\w]/,
    onlySpace: /[\s]/,
    AlphaWithSpace: /[a-zA-Z '\s]/,
  };
  public regexConstructor = {
    Alpha: 'a-z',
    Number: '\\\d',
    SpecialChar: '\\\W',
    anythingExceptSpace: '\\\S',
    anythingExceptNumber: '\\\D',
    AlphaNumeric: '\\\w',
    Space: '\\\s',
    AlphaWithSpace: 'a-zA-Z \\\s',
  };
  public allowOnly(Regex, e) {
    this.preventCharacters(this.regexMapping[Regex], e);
  }
  public userDefinedRegex(e, FirstChar, LastChar, IgnoreCaseSensitive?: boolean) {
    //Ranges & limits
    const input = String.fromCharCode(e.charCode);
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let regexp: any = /[a-z]/;
    if (IgnoreCaseSensitive) {
      regexp = /[a-z]/i;
    }
    const Alpha = alpha.match(regexp);
    const indexFirstChar = Alpha.indexOf(FirstChar);
    const indexLastChar = Alpha.indexOf(LastChar);
    const indexInputChar = Alpha.indexOf(input);
    if (indexFirstChar > indexInputChar || indexInputChar > indexLastChar) {
      e.preventDefault();
    }
  }
  public preventCharacters(pattern, event) {
    const input = String.fromCharCode(event.charCode) || event.clipboardData.getData('Text');
    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  public userDefinedPattern(event, CharacterClass1, CharacterClass2, IgnoreCaseSensitive?: boolean, array?: Array<any>) {
    //CharacterClasses

    let Char = this.regexConstructor[CharacterClass1];
    let Char2 = this.regexConstructor[CharacterClass2];
    if (Char2) {
      Char = Char + Char2;
    }
    let joinarr = array.join('');
    const pattern = '[' + Char + joinarr + ']';
    const RegexPattern = new RegExp(pattern, 'i');
    this.preventCharacters(RegexPattern, event);
  }
  public lookBehindAhead(event) {
    const pattern = /[1(?=(x))]/; //ahead
    this.preventCharacters(pattern, event);
  }
  public anchorStringStartEnd(event) {
    const pattern = /[\d{5}$]/; //Wrong
    this.preventCharacters(pattern, event);
  }
  public EmailId(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value !== undefined) {
        const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emailIdPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
        if (!emailIdPattern.test(control.value)) {
          return (control.value) ? null : { 'SetError': { valid: false } };
        }
      }
      return null;
    };
    // const pattern = /[^\d{1}$]/; // not understand
    // const patterns = /\b[1-5]/;  // between
   
    // const regex = new RegExp(email);
    // this.preventCharacters(regex, event);
  }

  public MinMax(controlcode, minVal, maxVal): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value !== undefined) {
        if (controlcode === 'NumberOnly') {
          const pattern = /[0-9]/
          for (let i = 0; i < control.value.length; i++) {
            const input = control.value.substring(i, i + 1)
            if (!pattern.test(input)) {
              return { 'MinMax': { valid: 'Only Numbers Must Be Allowed' } }
            }
          }
          if (control.value.length < parseInt(minVal) || control.value.length > parseInt(maxVal)) {
            if (parseInt(minVal) === parseInt(maxVal)) {
              return { 'MinMax': { valid: 'Length should be ' + minVal } };
            }
            else {
              return { 'MinMax': { valid: 'Length should between' + minVal + ' and ' + minVal } };
            }
          }
        } 
      }
    }
  }
}
